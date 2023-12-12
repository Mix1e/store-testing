import { EState, IMessageItem, IMessageModel } from '../models/messages-model.interface';
import { Action, ActionCreator, ActionReducer, createReducer, on } from '@ngrx/store';
import { initialState } from '../models/initial-state.const';

import {
    deleteMessage,
    deleteMessageSuccess,
    EDeletedMessagesAction,
    getDeletedMessages,
    getDeletedMessagesFailure,
    getDeletedMessagesSuccess,
} from '../actions/deleted.actions';

const reducers: ActionReducer<
    IMessageModel,
    ActionCreator<EDeletedMessagesAction, any>
> = createReducer(
    initialState,
    on(
        getDeletedMessages,
        (state: IMessageModel): IMessageModel => ({ ...state, state: EState.PENDING }),
    ),
    on(
        getDeletedMessagesSuccess,
        (state: IMessageModel, action): IMessageModel => ({
            ...state,
            error: undefined,
            state: EState.READY,
            messages: action.messages,
        }),
    ),
    on(
        getDeletedMessagesFailure,
        (state: IMessageModel, action): IMessageModel => ({
            ...state,
            messages: undefined,
            state: EState.ERROR,
            error: action.error,
        }),
    ),
    on(deleteMessageSuccess, (state: IMessageModel, action): IMessageModel => {
        const messages: IMessageItem[] = state.messages?.concat(action.message) ?? [];
        return {
            ...state,
            error: undefined,
            state: EState.READY,
            messages: messages,
        };
    }),
);

export function deletedReducer(state: IMessageModel | undefined, action: Action): IMessageModel {
    return reducers(state, action);
}
