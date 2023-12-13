import { EState, IMessageItem, IMessageModel } from '../models/messages-model.interface';
import { Action, ActionCreator, ActionReducer, createReducer, on } from '@ngrx/store';
import { initialState } from '../models/initial-state.const';

import {
    deleteMessage,
    deleteMessageFailure,
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
            messages: [...action.messages],
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
    on(deleteMessage, (state: IMessageModel, action): IMessageModel => {
        return {
            ...state,
            error: undefined,
            messages: state.messages ? [...state.messages] : [],
            state: EState.PENDING,
        };
    }),
    on(deleteMessageSuccess, (state: IMessageModel, action): IMessageModel => {
        let messages: IMessageItem[] = state.messages ?? [];
        if (!state.messages?.some((item: IMessageItem) => item.id === action.message.id)) {
            messages = state.messages?.concat(action.message) ?? [action.message];
        }
        return {
            ...state,
            error: undefined,
            state: EState.READY,
            messages,
        };
    }),
    on(deleteMessageFailure, (state: IMessageModel, action): IMessageModel => {
        return {
            ...state,
            error: action.error,
            state: EState.ERROR,
        };
    }),
);

export function deletedReducer(state: IMessageModel | undefined, action: Action): IMessageModel {
    return reducers(state, action);
}
