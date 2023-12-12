import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { MessageService } from '../../services/message.service';
import { IMessageItem } from '../models/messages-model.interface';
import {
    getAllMessages,
    getAllMessagesFailure,
    getAllMessagesSuccess,
} from '../actions/all.actions';
import {
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
            ofType(deleteMessageSuccess),
            mergeMap(() => of(getDeletedMessages())),
        ),
    );

    constructor(
        private actions$: Actions,
        private messageService: MessageService,
    ) {}
}
