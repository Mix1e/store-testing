import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { MessageService } from '../../services/message.service';
import { IMessageItem } from '../models/messages-model.interface';
import {
    deleteMessage,
    deleteMessageFailure,
    deleteMessageSuccess,
    getDeletedMessages,
    getDeletedMessagesFailure,
    getDeletedMessagesSuccess,
} from '../actions/deleted.actions';
@Injectable()
export class DeletedEffects {
    public getDeletedMessages$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(getDeletedMessages),
            mergeMap(() => this.messageService.getDeletedMessages()),
            map((messages: IMessageItem[]) => getDeletedMessagesSuccess({ messages })),
            catchError((error: string) => of(getDeletedMessagesFailure({ error }))),
        ),
    );

    public deleteMessage$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteMessage),
            mergeMap(({ message }) =>
                this.messageService.deleteMessage(message.id).pipe(
                    map((isDeleted: boolean) => {
                        if (isDeleted) return deleteMessageSuccess({ message });
                        throw new Error('Message not deleted');
                    }),
                ),
            ),
            catchError((error: string) => of(deleteMessageFailure({ error }))),
        ),
    );

    // public deleteMessageSuccess$: Observable<Action> = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(deleteMessageSuccess),
    //         mergeMap(({ message }) =>
    //
    //             getDeletedMessagesSuccess(message)
    //         ),
    //     ),
    // );

    constructor(
        private actions$: Actions,
        private messageService: MessageService,
    ) {}
}
