import { EState, IMessageItem, IMessageModel } from '../models/messages-model.interface';
import { Action, ActionCreator, ActionReducer, createReducer, on } from '@ngrx/store';
import { initialState } from '../models/initial-state.const';
import {
    addFavouriteMessage,
    addFavouriteMessageFailure,
    addFavouriteMessageSuccess,
    EFavouriteMessagesAction,
    getFavouriteMessages,
    getFavouriteMessagesFailure,
    getFavouriteMessagesSuccess,
    removeFavouriteMessage,
    removeFavouriteMessageFailure,
    removeFavouriteMessageSuccess,
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
            messages: [...action.messages],
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

    on(addFavouriteMessage, (state: IMessageModel, action): IMessageModel => {
        return {
            ...state,
            error: undefined,
            messages: state.messages ? [...state.messages] : undefined,
            state: EState.PENDING,
        };
    }),
    on(addFavouriteMessageSuccess, (state: IMessageModel, action): IMessageModel => {
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
    on(addFavouriteMessageFailure, (state: IMessageModel, action): IMessageModel => {
        return {
            ...state,
            error: action.error,
            state: EState.ERROR,
        };
    }),

    on(removeFavouriteMessage, (state: IMessageModel, action): IMessageModel => {
        return {
            ...state,
            error: undefined,
            messages: state.messages ? [...state.messages] : [],
            state: EState.PENDING,
        };
    }),
    on(removeFavouriteMessageSuccess, (state: IMessageModel, action): IMessageModel => {
        const messages: IMessageItem[] =
            state.messages?.filter((item: IMessageItem) => item.id !== action.message.id) || [];
        return {
            ...state,
            error: undefined,
            state: EState.READY,
            messages,
        };
    }),
    on(removeFavouriteMessageFailure, (state: IMessageModel, action): IMessageModel => {
        return {
            ...state,
            error: action.error,
            state: EState.ERROR,
        };
    }),
);

export function favouriteReducer(state: IMessageModel | undefined, action: Action): IMessageModel {
    return reducers(state, action);
}
