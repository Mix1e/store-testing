import { createSelector } from '@ngrx/store';
import { EState, IMessageModel } from './models/messages-model.interface';
import { EStoreKeys } from './models/store-key.const';
import { IAppState } from './models/app-state.interface';

export const selectFeature = (state: IAppState): IMessageModel => state[EStoreKeys.MESSAGES];

export const stateSelector = createSelector(selectFeature, (state) => state.state);
export const messagesSelector = createSelector(selectFeature, (state) => state.messages);
export const errorSelector = createSelector(selectFeature, (state) => state.error);
