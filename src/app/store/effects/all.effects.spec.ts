import { AllEffects } from './all.effects';
import { interval, map, Observable, of, take } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '../selectors/app.selectors';
import { TestBed } from '@angular/core/testing';
import { initialState } from '../models/initial-state.const';
import { provideMockActions } from '@ngrx/effects/testing';
import { MessageService } from '../../services/message.service';
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import {
    getAllMessages,
    getAllMessagesFailure,
    getAllMessagesSuccess,
} from '../actions/all.actions';
import { IMessageItem } from '../models/messages-model.interface';

// Вынес тестовые данные чтобы не писать каждый раз в it
const messagesStub: IMessageItem[] = [
    {
        id: 1,
        content: 'Hello World!',
    },
    {
        id: 2,
        content: 'BABABA',
    },
    {
        id: 3,
        content: 'BEBEBE',
    },
];

// Тестирование эффектов самое сложное, поэтому тут точно придётся конфигурировать тетсовый модуль
// через TestBed, где будут указан моковый store и моковые actions
describe('AllMessagesEffects', () => {
    // Делаем стаб сервиса который общается с бэком (в нашем случае не общается, но суть не меняется)
    // Делаем для того чтобы не дёргать реальный метод, и тестировать только работу эффекта
    const messageServiceStub = jasmine.createSpyObj('messageService', ['getMessages']);
    let effects: AllEffects;
    let actions: Observable<unknown>;
    let store: MockStore<IAppState>;
    let testScheduler: TestScheduler;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                // Наш класс эффектов
                AllEffects,
                // Провайдим начальное состояние для мокового Store
                provideMockStore({ initialState }),
                // Провайдим вместо экшенов нашу переменную actions с которой потом будем
                // развлекаться записывая в неё горячий observable
                provideMockActions(() => actions),
                // Провайдим вместо реального сервиса стаб
                { provide: MessageService, useValue: messageServiceStub },
            ],
        });

        effects = TestBed.inject(AllEffects);
        store = TestBed.inject(MockStore);

        // Устанавливаем состояние магазина (у каждого списка начанльное состояние)
        store.setState({
            messages: {
                all: initialState,
                favourite: initialState,
                deleted: initialState,
            },
        });

        // Для того чтобы проверять Observables через testScheduler нужно задать ему способ сравнения
        // подробнее в отдельном доке про Marbles
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    // Здесь происходит проверка что наш эффект может обработать action getAllMessages и
    // вернуть нужный action
    describe('getMessages$', () => {
        it('should handle getAllMessages and return a getAllMessagesSuccess action', () => {
            // Входной action
            const action = getAllMessages();

            // Выходной action
            const outcome = getAllMessagesSuccess({ messages: messagesStub });

            // Общая марбл диаграмма следующая:
            // -a
            //  -b
            // --b
            // а - входной action
            // b - ответ от сервера
            // получается мы ожидаем что финальный поток выдасть action через 2 тика
            testScheduler.run(({ hot, cold, expectObservable }) => {
                actions = hot('-a', { a: action });
                const response = cold('-b|', { b: messagesStub });
                messageServiceStub.getMessages.and.returnValue(response);

                expectObservable(effects.getMessages$).toBe('--b', { b: outcome });
            });
        });


        // Ситуация в целом похожа на предыдущую, только сервер выдаёт не данные, а ошибку
        it('should handle getAllMessages and return a getAllMessagesFailure action', () => {
            const action = getAllMessages();
            const outcome = getAllMessagesFailure({ error: 'BA' });

            testScheduler.run(({ hot, cold, expectObservable }) => {
                actions = hot('-a', { a: action });
                const response = cold('-#', {}, 'BA');
                messageServiceStub.getMessages.and.returnValue(response);

                expectObservable(effects.getMessages$).toBe('--(b|)', { b: outcome });
            });
        });

        // Примеры не относяжиеся к тестированию приложения, для лучшего понимания marble diagrams
        it('marbles should work', () => {
            testScheduler.run(({ hot, cold, expectObservable }) => {
                expectObservable(
                    of(1).pipe(map((val: number) => (val === 0 ? 'baba' : 'bebe'))),
                ).toBe('(b|)', { b: 'bebe' });
            });
        });

        it('marbles should work2', () => {
            testScheduler.run(({ hot, cold, expectObservable }) => {
                const interObs = interval(2).pipe(
                    take(5),
                    map((х) => х * 2),
                );

                expectObservable(interObs).toBe('--a-b-c-d-(e|)', { a: 0, b: 2, c: 4, d: 6, e: 8 });
            });
        });
    });
});
