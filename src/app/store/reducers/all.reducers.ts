import { EState, IMessageModel } from '../models/messages-model.interface';
import { Action, ActionCreator, ActionReducer, createReducer, on } from '@ngrx/store';
import { initialState } from '../models/initial-state.const';
import {
    getAllMessages,
    getAllMessagesSuccess,
    getAllMessagesFailure,
    EAllMessagesAction,
} from '../actions/all.actions';

const reducers: ActionReducer<
    IMessageModel,
    ActionCreator<EAllMessagesAction, any>
> = createReducer(
    initialState,
    on(
        getAllMessages,
        (state: IMessageModel): IMessageModel => ({ ...state, state: EState.PENDING }),
    ),
    on(
        getAllMessagesSuccess,
        (state: IMessageModel, action): IMessageModel => ({
            ...state,
            error: undefined,
            state: EState.READY,
            messages: action.messages,
        }),
    ),
    on(
        getAllMessagesFailure,
        (state: IMessageModel, action): IMessageModel => ({
            ...state,
            messages: undefined,
            state: EState.ERROR,
            error: action.error,
        }),
    ),
);

export function allReducer(state: IMessageModel | undefined, action: Action): IMessageModel {
    return reducers(state, action);
}
