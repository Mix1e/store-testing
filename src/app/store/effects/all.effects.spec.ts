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

describe('AllMessagesEffects', () => {
    const messageServiceStub = jasmine.createSpyObj('messageService', ['getMessages']);
    let effects: AllEffects;
    let actions: Observable<unknown>;
    let store: MockStore<IAppState>;
    let testScheduler: TestScheduler;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AllEffects,
                provideMockStore({ initialState }),
                provideMockActions(() => actions),
                { provide: MessageService, useValue: messageServiceStub },
            ],
        });

        effects = TestBed.inject(AllEffects);
        store = TestBed.inject(MockStore);
        store.setState({
            messages: {
                all: initialState,
                favourite: initialState,
                deleted: initialState,
            },
        });

        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    describe('getMessages$', () => {
        it('should handle getAllMessages and return a getAllMessagesSuccess action', () => {
            const action = getAllMessages();
            const outcome = getAllMessagesSuccess({ messages: messagesStub });

            // -a
            //  -b
            // --b
            testScheduler.run(({ hot, cold, expectObservable }) => {
                actions = hot('-a', { a: action });
                const response = cold('-b|', { b: messagesStub });
                messageServiceStub.getMessages.and.returnValue(response);

                expectObservable(effects.getMessages$).toBe('--b', { b: outcome });
            });
        });

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
