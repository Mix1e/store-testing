import {IMessageModel} from "./messages-model.interface";
import {EStoreKeys} from "./store-key.const";

export interface IAppState {
    [EStoreKeys.MESSAGES]: IMessageModel;
}
