import { TestBed } from '@angular/core/testing';
import { initialState } from '../models/initial-state.const';
import { allReducer } from './all.reducers';

describe('AppReducers', () => {
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

            const state = allReducer(initialState, action);

            expect(state).toBe(initialState);
        });
    });

    describe('getMessagesSuccess action', () => {
        it('should update the state in an immutable way', () => {
            /*const newState: IMessageModel[] = [

            ];

            const action = getMessagesSuccess({ messages: newState });
            const state = reducers(initialState, action);

            expect(state).toEqual(newState);*/
        });
    });
});
