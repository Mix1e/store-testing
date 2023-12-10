import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {reducers} from "./store/app.reducers";
import {provideState, provideStore} from "@ngrx/store";
import {EStoreKeys} from "./store/models/store-key.const";
import {provideEffects} from "@ngrx/effects";
import {AppEffects} from "./store/app.effects";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        // STORE
        provideStore(reducers),
        provideState({
            name: EStoreKeys.MESSAGES,
            reducer: reducers,
        }),
        provideEffects(
            [AppEffects]
        ),

        //STORE DEVTOOLS
        provideStoreDevtools({
            maxAge: 25,
        }),
    ],
};
