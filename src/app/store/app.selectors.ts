import {IAppState} from "./models/app-state.interface";
import {createSelector} from "@ngrx/store";
import {MemoizedSelector} from "@ngrx/store/src/selector";
import {IItems} from "./models/items.interface";

export const selectFeature = (state: IItems): IItems => state;

export const isLoadingSelector: MemoizedSelector<IItems, boolean> = createSelector(selectFeature, (state: IItems) => state.isLoading);
