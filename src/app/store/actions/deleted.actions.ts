import { createAction, props } from '@ngrx/store';
import { IMessageItem } from '../models/messages-model.interface';

export enum EDeletedMessagesAction {
    GET_DELETED_MESSAGES = '[Messages] Get deleted Messages',
    GET_DELETED_MESSAGES_SUCCESS = '[Messages] Get deleted Messages success',
    GET_DELETED_MESSAGES_FAILURE = '[Messages] Get deleted Messages failure',
    DELETE_MESSAGE = '[Messages] Delete Message',
    DELETE_MESSAGE_SUCCESS = '[Messages] Delete Message success',
    DELETE_MESSAGE_FAILURE = '[Messages] Delete Message failure',
    UN_DELETE_MESSAGE = '[Messages] UnDelete Message',
    UN_DELETE_MESSAGE_SUCCESS = '[Messages] UnDelete Message success',
    UN_DELETE_MESSAGE_FAILURE = '[Messages] UnDelete Message failure',
}

export const getDeletedMessages = createAction(EDeletedMessagesAction.GET_DELETED_MESSAGES);
export const getDeletedMessagesSuccess = createAction(
    EDeletedMessagesAction.GET_DELETED_MESSAGES_SUCCESS,
    props<{
        messages: IMessageItem[];
    }>(),
);
export const getDeletedMessagesFailure = createAction(
    EDeletedMessagesAction.GET_DELETED_MESSAGES_FAILURE,
    props<{
        error: string;
    }>(),
);

export const deleteMessage = createAction(
    EDeletedMessagesAction.DELETE_MESSAGE,
    props<{
        message: IMessageItem;
    }>(),
);

export const deleteMessageSuccess = createAction(
    EDeletedMessagesAction.DELETE_MESSAGE_SUCCESS,
    props<{
        message: IMessageItem;
    }>(),
);

export const deleteMessageFailure = createAction(
    EDeletedMessagesAction.DELETE_MESSAGE_FAILURE,
    props<{
        error: string;
    }>(),
);

export const unDeleteMessage = createAction(
    EDeletedMessagesAction.UN_DELETE_MESSAGE,
    props<{
        message: IMessageItem;
    }>(),
);

export const unDeleteMessageSuccess = createAction(
    EDeletedMessagesAction.UN_DELETE_MESSAGE_SUCCESS,
    props<{
        message: IMessageItem;
    }>(),
);

export const unDeleteMessageFailure = createAction(
    EDeletedMessagesAction.UN_DELETE_MESSAGE_FAILURE,
    props<{
        error: string;
    }>(),
);
