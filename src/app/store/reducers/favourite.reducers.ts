import { EState, IMessageModel } from '../models/messages-model.interface';
import { Action, ActionCreator, ActionReducer, createReducer, on } from '@ngrx/store';
import { initialState } from '../models/initial-state.const';
import {
    EFavouriteMessagesAction,
    getFavouriteMessages,
    getFavouriteMessagesFailure,
    getFavouriteMessagesSuccess,
} from '../actions/favourite.actions';

const reducers: ActionReducer<
    IMessageModel,
    ActionCreator<EFavouriteMessagesAction, any>
> = createReducer(
    initialState,
    on(
        getFavouriteMessages,
        (state: IMessageModel): IMessageModel => ({ ...state, state: EState.PENDING }),
    ),
    on(
        getFavouriteMessagesSuccess,
        (state: IMessageModel, action): IMessageModel => ({
            ...state,
            error: undefined,
            state: EState.READY,
            messages: action.messages,
        }),
    ),
    on(
        getFavouriteMessagesFailure,
        (state: IMessageModel, action): IMessageModel => ({
            ...state,
            messages: undefined,
            state: EState.ERROR,
            error: action.error,
        }),
    ),
);

export function favouriteReducer(state: IMessageModel | undefined, action: Action): IMessageModel {
    return reducers(state, action);
}
