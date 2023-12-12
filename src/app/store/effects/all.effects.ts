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
@Injectable()
export class AllEffects {
    public getMessages$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(getAllMessages),
            mergeMap(() => this.messageService.getMessages()),
            map((messages: IMessageItem[]) => getAllMessagesSuccess({ messages })),
            catchError((error: string) => of(getAllMessagesFailure({ error }))),
        ),
    );

    constructor(
        private actions$: Actions,
        private messageService: MessageService,
    ) {}
}
