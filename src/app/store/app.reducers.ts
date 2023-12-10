import { EState, IMessageModel } from './models/messages-model.interface';
import { createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions';

export const initialState: IMessageModel = {
    state: EState.READY,
    messages: [],
};

export const reducers = createReducer(
    initialState,
    on(
        AppActions.getMessages,
        (state: IMessageModel): IMessageModel => ({ ...state, state: EState.PENDING }),
    ),
    on(
        AppActions.getMessagesSuccess,
        (state: IMessageModel, action): IMessageModel => ({
            ...state,
            error: undefined,
            state: EState.READY,
            messages: action.messages,
        }),
    ),
    on(
        AppActions.getMessagesFailure,
        (state: IMessageModel, action): IMessageModel => ({
            ...state,
            messages: undefined,
            state: EState.ERROR,
            error: action.error,
        }),
    ),
);
