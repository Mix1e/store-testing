import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as MessageActions from './app.actions'
import {catchError, map, mergeMap, Observable, of, switchMap} from "rxjs";
import {MessageService} from "../services/message.service";
import {IMessageItem} from "./models/messages-model.interface";
import {Action} from "@ngrx/store";
@Injectable()
export class AppEffects {

    public getMessages$: Observable<Action> = createEffect(
        () => this.actions$.pipe(
            ofType(MessageActions.getMessages),
            mergeMap(
                () => this.messageService.getMessages()
            ),
            map(
                (messages: IMessageItem[]) => MessageActions.getMessagesSuccess({messages})
            ),
            catchError(
                (error: string) => of(MessageActions.getMessagesFailure({error}))
            ),
        )
    )


    constructor(
        private actions$: Actions,
        private messageService: MessageService,
    ) {
    }
}
