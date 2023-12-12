import { createAction, props } from '@ngrx/store';
import { IMessageItem } from '../models/messages-model.interface';

export enum EAllMessagesAction {
    GET_ALL_MESSAGES = '[Messages] Get all Messages',
    GET_ALL_MESSAGES_SUCCESS = '[Messages] Get all Messages success',
    GET_ALL_MESSAGES_FAILURE = '[Messages] Get all Messages failure',
}

export const getAllMessages = createAction(EAllMessagesAction.GET_ALL_MESSAGES);
export const getAllMessagesSuccess = createAction(
    EAllMessagesAction.GET_ALL_MESSAGES_SUCCESS,
    props<{
        messages: IMessageItem[];
    }>(),
);
export const getAllMessagesFailure = createAction(
    EAllMessagesAction.GET_ALL_MESSAGES_FAILURE,
    props<{
        error: string;
    }>(),
);
