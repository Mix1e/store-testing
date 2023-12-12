import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { map, Observable, of } from 'rxjs';
import { EState, IMessageItem, IMessageModel } from '../../store/models/messages-model.interface';
import {
    deletedMessages,
    favouriteMessages,
    allMessages,
    IAppState,
} from '../../store/app.selectors';
import { getAllMessages } from '../../store/actions/all.actions';
import { getFavouriteMessages } from '../../store/actions/favourite.actions';
import {
    deleteMessage,
    deleteMessageSuccess,
    getDeletedMessages,
} from '../../store/actions/deleted.actions';
import { MessageComponent } from '../message/message.component';

@Component({
    selector: 'app-test',
    standalone: true,
    imports: [CommonModule, MessageComponent],
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss'],
})
export class TestComponent {
    public State: typeof EState = EState;
    public allMessages$: Observable<IMessageModel>;
    public favouriteMessages$: Observable<IMessageModel>;
    public deletedMessages$: Observable<IMessageModel>;

    constructor(private store: Store<IAppState>) {
        this.allMessages$ = this.store.pipe(select(allMessages));

        this.favouriteMessages$ = this.store.pipe(select(favouriteMessages));
        this.deletedMessages$ = this.store.pipe(select(deletedMessages));
    }

    onLike(message: IMessageItem): void {
        // this.store.dispatch(likeMessage(message));
    }

    onDelete(message: IMessageItem): void {
        this.store.dispatch(deleteMessageSuccess({ message }));
    }
    getAllMessages(): void {
        this.store.dispatch(getAllMessages());
    }
    getFavouriteMessages(): void {
        this.store.dispatch(getFavouriteMessages());
    }
    getDeletedMessages(): void {
        this.store.dispatch(getDeletedMessages());
    }
}
