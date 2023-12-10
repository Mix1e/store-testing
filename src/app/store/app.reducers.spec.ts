import { TestBed } from '@angular/core/testing';
import { initialState, reducers } from './app.reducers';

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

            const state = reducers(initialState, action);

            expect(state).toBe(initialState);
        });
    });
});
