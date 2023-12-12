import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { MessageService } from '../../services/message.service';
import { IMessageItem } from '../models/messages-model.interface';
import {
    getFavouriteMessages,
    getFavouriteMessagesFailure,
    getFavouriteMessagesSuccess,
} from '../actions/favourite.actions';
@Injectable()
export class FavouriteEffects {
    public getFavouriteMessages$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(getFavouriteMessages),
            mergeMap(() => this.messageService.getFavouriteMessages()),
            map((messages: IMessageItem[]) => getFavouriteMessagesSuccess({ messages })),
            catchError((error: string) => of(getFavouriteMessagesFailure({ error }))),
        ),
    );

    constructor(
        private actions$: Actions,
        private messageService: MessageService,
    ) {}
}
