import { createSelector } from '@ngrx/store';
import { IMessageModel } from './models/messages-model.interface';
import { EStoreKeys } from './models/store-key.const';

export interface IAppState {
    [EStoreKeys.MESSAGES]: IMessagesState;
}

interface IMessagesState {
    all: IMessageModel;
    favourite: IMessageModel;
    deleted: IMessageModel;
}

export const selectFeature = (state: IAppState): IMessagesState => state[EStoreKeys.MESSAGES];

export const allMessages = createSelector(selectFeature, (state) => state.all);
export const favouriteMessages = createSelector(selectFeature, (state) => state.favourite);
export const deletedMessages = createSelector(selectFeature, (state) => state.deleted);
