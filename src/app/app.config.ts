import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideState, provideStore } from '@ngrx/store';
import { EStoreKeys } from './store/models/store-key.const';
import { provideEffects } from '@ngrx/effects';
import { allReducer } from './store/reducers/all.reducers';
import { deletedReducer } from './store/reducers/deleted.reducers';
import { favouriteReducer } from './store/reducers/favourite.reducers';
import { AllEffects } from './store/effects/all.effects';
import { DeletedEffects } from './store/effects/deleted.effects';
import { FavouriteEffects } from './store/effects/favourite.effects';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),

        // STORE
        provideStore(),
        provideState(EStoreKeys.MESSAGES, {
            all: allReducer,
            favourite: favouriteReducer,
            deleted: deletedReducer,
        }),
        provideEffects([AllEffects, DeletedEffects, FavouriteEffects]),

        //STORE DEVTOOLS
        provideStoreDevtools({
            maxAge: 25,
        }),
    ],
};
