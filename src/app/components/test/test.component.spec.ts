import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestComponent } from './test.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../store/models/initial-state.const';
import { MessageComponent } from '../message/message.component';
import { EState, IMessageItem, IMessageModel } from '../../store/models/messages-model.interface';
import { addFavouriteMessage } from '../../store/actions/favourite.actions';
import { allMessages, IAppState } from '../../store/selectors/app.selectors';
import { By } from '@angular/platform-browser';
import { MemoizedSelector } from '@ngrx/store';

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

// Тут уже идёт тестирование компонента с store больше похожее на интеграционное тестирование
describe('ComponentTestComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let store: MockStore;

    beforeEach(async () => {
        // Настраиваем тестовый модуль
        await TestBed.configureTestingModule({
            imports: [TestComponent, MessageComponent],
            providers: [provideMockStore({ initialState })],
        }).compileComponents();

        store = TestBed.inject(MockStore);
        store.setState({
            messages: {
                all: initialState,
                favourite: initialState,
                deleted: initialState,
            },
        });
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        // Мокаем метод dispatch у store
        spyOn(store, 'dispatch').and.callFake(() => {});
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // Проверяем что входной action метода dispatch при нажатии на "Лайк"
    it('unfavourite message', () => {
        const message: IMessageItem = messagesStub[0];

        // Можно заменить на реальное нажатие кнопки
        component.addToFavourite(message);

        expect(store.dispatch).toHaveBeenCalledWith(addFavouriteMessage({ message }));
    });

    // Блок с тестированием селекторов
    describe('selectors', () => {
        // Мокаем селектор
        let mockMessagesSelector: MemoizedSelector<IAppState, IMessageModel>;
        const model: IMessageModel = {
            state: EState.READY,
            messages: messagesStub,
        };
        beforeEach(() => {
            // Заствляем возвращать заданную модель на селетор allMessages
            mockMessagesSelector = store.overrideSelector(allMessages, model);
            // Очищаем состояние store
            store.refreshState();
            fixture.detectChanges();
        });

        it('should render all messages', () => {
            // Ожидаем что отрисуются все элементы из переменной messagesStub
            expect(fixture.debugElement.queryAll(By.css('.test')).length).toBe(3);
        });

        it('should update UI when the selector changes', () => {
            // Подменяем результат работы селектора
            mockMessagesSelector.setResult({
                state: EState.READY,
                messages: [messagesStub[0]],
            });
            store.refreshState();
            fixture.detectChanges();

            // Ожидаем что наш компонент отрисует новые данные
            expect(fixture.debugElement.queryAll(By.css('.test')).length).toBe(1);
        });
    });
});
