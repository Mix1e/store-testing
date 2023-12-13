import { createAction, props } from '@ngrx/store';
import { IMessageItem } from '../models/messages-model.interface';

export enum EFavouriteMessagesAction {
    GET_FAVOURITE_MESSAGES = '[Messages] Get favourite Messages',
    GET_FAVOURITE_MESSAGES_SUCCESS = '[Messages] Get favourite Messages success',
    GET_FAVOURITE_MESSAGES_FAILURE = '[Messages] Get favourite Messages failure',
    ADD_FAVOURITE_MESSAGES = '[Messages] Add favourite Messages',
    ADD_FAVOURITE_MESSAGES_SUCCESS = '[Messages] Add favourite Messages success',
    ADD_FAVOURITE_MESSAGES_FAILURE = '[Messages] Add favourite Messages failure',
    REMOVE_FAVOURITE_MESSAGES = '[Messages] Remove favourite Messages',
    REMOVE_FAVOURITE_MESSAGES_SUCCESS = '[Messages] Remove favourite Messages success',
    REMOVE_FAVOURITE_MESSAGES_FAILURE = '[Messages] Remove favourite Messages failure',
}

export const getFavouriteMessages = createAction(EFavouriteMessagesAction.GET_FAVOURITE_MESSAGES);
export const getFavouriteMessagesSuccess = createAction(
    EFavouriteMessagesAction.GET_FAVOURITE_MESSAGES_SUCCESS,
    props<{
        messages: IMessageItem[];
    }>(),
);
export const getFavouriteMessagesFailure = createAction(
    EFavouriteMessagesAction.GET_FAVOURITE_MESSAGES_FAILURE,
    props<{
        error: string;
    }>(),
);

export const addFavouriteMessage = createAction(
    EFavouriteMessagesAction.ADD_FAVOURITE_MESSAGES,
    props<{
        message: IMessageItem;
    }>(),
);

export const addFavouriteMessageSuccess = createAction(
    EFavouriteMessagesAction.ADD_FAVOURITE_MESSAGES_SUCCESS,
    props<{
        message: IMessageItem;
    }>(),
);

export const addFavouriteMessageFailure = createAction(
    EFavouriteMessagesAction.ADD_FAVOURITE_MESSAGES_FAILURE,
    props<{
        error: string;
    }>(),
);

export const removeFavouriteMessage = createAction(
    EFavouriteMessagesAction.REMOVE_FAVOURITE_MESSAGES,
    props<{
        message: IMessageItem;
    }>(),
);

export const removeFavouriteMessageSuccess = createAction(
    EFavouriteMessagesAction.REMOVE_FAVOURITE_MESSAGES_SUCCESS,
    props<{
        message: IMessageItem;
    }>(),
);

export const removeFavouriteMessageFailure = createAction(
    EFavouriteMessagesAction.REMOVE_FAVOURITE_MESSAGES_FAILURE,
    props<{
        error: string;
    }>(),
);
