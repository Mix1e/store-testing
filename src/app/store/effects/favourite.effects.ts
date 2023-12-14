import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { MessageService } from '../../services/message.service';
import { IMessageItem } from '../models/messages-model.interface';
import {
    addFavouriteMessage,
    addFavouriteMessageFailure,
    addFavouriteMessageSuccess,
    getFavouriteMessages,
    getFavouriteMessagesFailure,
    getFavouriteMessagesSuccess,
    removeFavouriteMessage,
    removeFavouriteMessageFailure,
    removeFavouriteMessageSuccess,
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

    public addFavouriteMessage$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(addFavouriteMessage),
            mergeMap(({ message }) =>
                this.messageService.addToFavouriteMessage(message.id).pipe(
                    map((added: boolean) => {
                        if (added) return addFavouriteMessageSuccess({ message });
                        throw new Error('Message not added to favorite');
                    }),
                ),
            ),
            catchError((error: Error) => of(addFavouriteMessageFailure({ error: error.message }))),
        ),
    );

    public removeFavouriteMessage$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(removeFavouriteMessage),
            mergeMap(({ message }) =>
                this.messageService.unFavouriteMessage(message.id).pipe(
                    map((removed: boolean) => {
                        if (removed) return removeFavouriteMessageSuccess({ message });
                        throw new Error('Message not removed from favorite');
                    }),
                ),
            ),
            catchError((error: Error) =>
                of(removeFavouriteMessageFailure({ error: error.message })),
            ),
        ),
    );

    constructor(
        private actions$: Actions,
        private messageService: MessageService,
    ) {}
}
