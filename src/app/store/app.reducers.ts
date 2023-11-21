import {IItems} from "./models/items.interface";
import {createReducer, on} from "@ngrx/store";
import * as AppActions from './app.actions';

export const initialState: IItems = {
    items: [],
    isLoading: false,
};

export const reducers = createReducer(initialState,
    on(AppActions.getItems, (state: IItems): IItems => ({...state, isLoading: true}))
)
