import { TestBed } from '@angular/core/testing';
import { initialState } from '../models/initial-state.const';
import { EState, IMessageItem, IMessageModel } from '../models/messages-model.interface';
import { favouriteReducer } from './favourite.reducers';
import {
    addFavouriteMessageSuccess,
    getFavouriteMessagesSuccess,
} from '../actions/favourite.actions';

// Теста аналогичны тому что в all.reducers.spec
describe('FavouriteReducers', () => {
    describe('unknown action', () => {
        it('should return the default state', () => {
            const action = {
                type: '123',
            };

            const state: IMessageModel = favouriteReducer(initialState, action);

            expect(state).toBe(initialState);
        });
    });

    describe('getFavouriteMessagesSuccess action', () => {
        it('should update the state in an immutable way', () => {
            const newStateMessages: IMessageItem[] = [{ id: 1, content: 'some content' }];

            const action = getFavouriteMessagesSuccess({ messages: newStateMessages });
            const state = favouriteReducer(initialState, action);

            expect(state.messages).toEqual(newStateMessages);
            expect(state.messages).not.toBe(newStateMessages);
        });
    });

    describe('addFavouriteMessageSuccess action', () => {
        it('should update the state in an immutable way', () => {
            const initialState: IMessageModel = {
                state: EState.READY,
                messages: [
                    {
                        id: 32,
                        content: 'qwwsad',
                    },
                ],
            };
            const favouriteMessage: IMessageItem = {
                id: 123,
                content: 'babbebebe',
            };

            const action = addFavouriteMessageSuccess({ message: favouriteMessage });
            const state = favouriteReducer(initialState, action);
            const expectedMessages: IMessageItem[] = initialState.messages || [];
            /*if (initialState.messages) {
                expectedMessages.push(...initialState.messages);
            }*/
            expectedMessages.push(favouriteMessage);

            expect(state.messages).toEqual(expectedMessages);
            expect(state.messages).not.toBe(initialState.messages);
        });
    });
});
