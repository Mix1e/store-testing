import { createAction, props } from '@ngrx/store';
import { IMessageItem } from '../models/messages-model.interface';

export enum EFavouriteMessagesAction {
    GET_FAVOURITE_MESSAGES = '[Messages] Get favourite Messages',
    GET_FAVOURITE_MESSAGES_SUCCESS = '[Messages] Get favourite Messages success',
    GET_FAVOURITE_MESSAGES_FAILURE = '[Messages] Get favourite Messages failure',
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
