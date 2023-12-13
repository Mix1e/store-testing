import { Injectable } from '@angular/core';
import { delay, Observable, of, switchMap, throwError } from 'rxjs';
import { IMessageItem } from '../store/models/messages-model.interface';
import { FavouriteEffects } from '../store/effects/favourite.effects';

export interface IBEMessageItem extends IMessageItem {
    favourite: boolean;
    deleted: boolean;
}

const messageItemMapper = (beItem: IBEMessageItem): IMessageItem => ({
    id: beItem.id,
    content: beItem.content,
});

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    messages: IBEMessageItem[] = [
        {
            id: 1,
            content: 'Hello World!',
            favourite: false,
            deleted: false,
        },
        {
            id: 2,
            content: 'BABABA',
            favourite: false,
            deleted: false,
        },
        {
            id: 3,
            content: 'BEBEBE',
            favourite: false,
            deleted: false,
        },
    ];
    constructor() {}

    public getMessages(): Observable<IMessageItem[] | never> {
        return of(this.messages.map(messageItemMapper)).pipe(
            delay(1000),
            // switchMap(() => throwError('BIM BIM BOM BOM SERVER UPAL')),
        );
    }

    public getFavouriteMessages(): Observable<IMessageItem[] | never> {
        return of(
            this.messages.filter((item: IBEMessageItem) => item.favourite).map(messageItemMapper),
        ).pipe(
            delay(1000),
            // switchMap(
            //     () => throwError('BIM BIM BOM BOM SERVER UPAL')
            // ),
        );
    }

    public getDeletedMessages(): Observable<IMessageItem[] | never> {
        return of(
            this.messages.filter((item: IBEMessageItem) => item.deleted).map(messageItemMapper),
        ).pipe(
            delay(1000),
            // switchMap(
            //     () => throwError('BIM BIM BOM BOM SERVER UPAL')
            // ),
        );
    }

    public addToFavouriteMessage(id: number): Observable<boolean | never> {
        const item: IBEMessageItem | undefined = this.messages.find(
            (beItem: IBEMessageItem) => beItem.id === id,
        );

        let result: boolean = false;
        if (item) {
            item.favourite = true;
            result = true;
        }

        return of(result).pipe(
            delay(1000),
            // switchMap(
            //     () => throwError('BIM BIM BOM BOM SERVER UPAL')
            // ),
        );
    }

    public unFavouriteMessage(id: number): Observable<boolean | never> {
        const item: IBEMessageItem | undefined = this.messages.find(
            (beItem: IBEMessageItem) => beItem.id === id,
        );

        let result: boolean = false;
        if (item) {
            item.favourite = false;
            result = true;
        }

        return of(result).pipe(
            delay(1000),
            // switchMap(
            //     () => throwError('BIM BIM BOM BOM SERVER UPAL')
            // ),
        );
    }

    public deleteMessage(id: number): Observable<boolean | never> {
        return of(true).pipe(
            delay(1000),
            // switchMap(
            //     () => throwError('BIM BIM BOM BOM SERVER UPAL')
            // ),
        );
    }
}
