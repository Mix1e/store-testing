import { EState, IMessageItem, IMessageModel } from '../models/messages-model.interface';
import { allMessages, favouriteMessages } from './app.selectors';
import { initialState } from '../models/initial-state.const';
import { allReducer } from '../reducers/all.reducers';
import { getAllMessagesFailure } from '../actions/all.actions';

describe('AppSelector', () => {
    it('Select allMessages through reducer', () => {
        const state: IMessageModel = {
            state: EState.ERROR,
            error: 'ERROR',
            messages: undefined,
        };
        const result = allMessages.projector({
            all: allReducer(initialState, getAllMessagesFailure({ error: 'ERROR' })),
            favourite: initialState,
            deleted: initialState,
        });

        expect(result).toEqual(state);
        expect(result).not.toBe(state);
    });

    it('Select allMessages state', () => {
        const state: IMessageModel = {
            state: EState.ERROR,
            error: 'ERROR',
            messages: undefined,
        };
        const result = allMessages.projector({
            all: state,
            favourite: initialState,
            deleted: initialState,
        });

        expect(result).withContext('all').toEqual(state);
        expect(result).withContext('all').toEqual(state);
    });

    it('Select favouriteMessages state', () => {
        const state: IMessageModel = {
            state: EState.ERROR,
            error: 'ERROR',
            messages: undefined,
        };
        const result = favouriteMessages.projector({
            all: state,
            favourite: initialState,
            deleted: state,
        });

        expect(result).withContext('favouriteMessages').toEqual(initialState);
    });
});
