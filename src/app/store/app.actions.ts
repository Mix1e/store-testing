import {createAction} from "@ngrx/store";

export enum EAppAction {
    GET_ITEMS = '[Items] Get Items',
}

export const getItems = createAction(EAppAction.GET_ITEMS);
