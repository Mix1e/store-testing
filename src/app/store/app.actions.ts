import {createAction, props} from "@ngrx/store";
import {IMessageItem} from "./models/messages-model.interface";

export enum EAppAction {
    GET_MESSAGES = '[Messages] Get Messages',
    GET_MESSAGES_SUCCESS = '[Messages] Get Messages success',
    GET_MESSAGES_FAILURE = '[Messages] Get Messages failure',
}

export const getMessages = createAction(EAppAction.GET_MESSAGES);
export const getMessagesSuccess = createAction(EAppAction.GET_MESSAGES_SUCCESS, props<{
    messages: IMessageItem[]
}>());
export const getMessagesFailure = createAction(EAppAction.GET_MESSAGES_FAILURE, props<{
    error: string
}>());
