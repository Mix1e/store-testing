import { Observable } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '../selectors/app.selectors';
import { TestBed } from '@angular/core/testing';
import { initialState } from '../models/initial-state.const';
import { provideMockActions } from '@ngrx/effects/testing';
import { MessageService } from '../../services/message.service';
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { IMessageItem } from '../models/messages-model.interface';
import { FavouriteEffects } from './favourite.effects';
import {
    addFavouriteMessage,
    addFavouriteMessageFailure,
    addFavouriteMessageSuccess,
} from '../actions/favourite.actions';

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
// Чтобы ознакомиться с этим файлом лучше сначала изучить all.effects.spec.ts
describe('FavouriteMessagesEffects', () => {
    const messageServiceStub = jasmine.createSpyObj('messageService', ['addToFavouriteMessage']);
    let effects: FavouriteEffects;
    let actions: Observable<unknown>;
    let store: MockStore<IAppState>;
    let testScheduler: TestScheduler;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FavouriteEffects,
                provideMockStore({ initialState }),
                provideMockActions(() => actions),
                { provide: MessageService, useValue: messageServiceStub },
            ],
        });

        effects = TestBed.inject(FavouriteEffects);
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

    describe('addFavouriteMessage$', () => {
        it('should handle addFavouriteMessage and return a addFavouriteMessageSuccess action', () => {
            const message: IMessageItem = messagesStub[0];
            const action = addFavouriteMessage({ message });
            const outcome = addFavouriteMessageSuccess({ message });

            // -a
            //  -b
            // --b
            testScheduler.run(({ hot, cold, expectObservable }) => {
                actions = hot('-a', { a: action });
                const response = cold('-b', { b: true });
                messageServiceStub.addToFavouriteMessage.and.returnValue(response);

                expectObservable(effects.addFavouriteMessage$).toBe('--b', { b: outcome });
            });
        });

        it('should handle addFavouriteMessage and return a addFavouriteMessageFailure action', () => {
            const message: IMessageItem = messagesStub[0];
            const error: string = 'Message not added to favorite';
            const action = addFavouriteMessage({ message });
            const outcome = addFavouriteMessageFailure({ error });

            // -a
            //  -b
            // --b
            testScheduler.run(({ hot, cold, expectObservable }) => {
                actions = hot('-a', { a: action });
                const response = cold('-b#|', { b: false });
                messageServiceStub.addToFavouriteMessage.and.returnValue(response);

                expectObservable(effects.addFavouriteMessage$).toBe('--(c|)', { c: outcome });
            });
        });
    });
});
