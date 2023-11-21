import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {reducers} from "./store/app.reducers";
import {provideState, provideStore} from "@ngrx/store";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        // provideState({
        //     name: 'items',
        //     reducer: reducers,
        // }),
        provideStore(reducers),
        provideStoreDevtools({
            maxAge: 25,
        }),
    ],
};
