import { TestBed } from '@angular/core/testing';
import { initialState } from '../models/initial-state.const';
import { allReducer } from './all.reducers';
import { IMessageItem, IMessageModel } from '../models/messages-model.interface';
import { getAllMessagesSuccess } from '../actions/all.actions';

describe('AllReducers', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [],
        });
    });

    describe('unknown action', () => {
        it('should return the default state', () => {
            const action = {
                type: '123',
            };

            const state: IMessageModel = allReducer(initialState, action);

            expect(state).toBe(initialState);
        });
    });

    describe('getAllMessagesSuccess action', () => {
        it('should update the state in an immutable way', () => {
            const newStateMessages: IMessageItem[] = [{ id: 1, content: 'some content' }];

            const action = getAllMessagesSuccess({ messages: newStateMessages });
            const state = allReducer(initialState, action);

            expect(state.messages).withContext('toEqual').toEqual(newStateMessages);
            expect(state.messages).withContext('not.toBe').not.toBe(newStateMessages);
        });
    });

    describe('', () => {
        it('', () => {});
    });
});
