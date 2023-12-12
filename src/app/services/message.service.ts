import { Injectable } from '@angular/core';
import { delay, Observable, of, switchMap, throwError } from 'rxjs';
import { IMessageItem } from '../store/models/messages-model.interface';
import { FavouriteEffects } from '../store/effects/favourite.effects';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    constructor() {}

    public getMessages(): Observable<IMessageItem[] | never> {
        return of([
            {
                id: 1,
                content: 'Hello World!',
            },
        ]).pipe(
            delay(1000),
            // switchMap(
            //     () => throwError('BIM BIM BOM BOM SERVER UPAL')
            // ),
        );
    }

    public getFavouriteMessages(): Observable<IMessageItem[] | never> {
        return of([]).pipe(
            delay(1000),
            // switchMap(
            //     () => throwError('BIM BIM BOM BOM SERVER UPAL')
            // ),
        );
    }

    public getDeletedMessages(): Observable<IMessageItem[] | never> {
        return of([]).pipe(
            delay(1000),
            // switchMap(
            //     () => throwError('BIM BIM BOM BOM SERVER UPAL')
            // ),
        );
    }
}
