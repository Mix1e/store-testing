import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { getMessages } from '../../store/app.actions';
import { map, Observable, of } from 'rxjs';
import { EState, IMessageItem } from '../../store/models/messages-model.interface';
import { errorSelector, messagesSelector, stateSelector } from '../../store/app.selectors';
import { IAppState } from '../../store/models/app-state.interface';

@Component({
    selector: 'app-test',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './test.component.html',
})
export class TestComponent {
    public State: typeof EState = EState;

    public dataState$: Observable<EState>;
    public messages$: Observable<IMessageItem[] | undefined>;
    public error$: Observable<string | undefined>;

    constructor(private store: Store<IAppState>) {
        this.dataState$ = this.store.pipe(select(stateSelector));
        this.messages$ = this.store.pipe(select(messagesSelector));

        this.error$ = this.store.pipe(select(errorSelector));
    }

    sendData(): void {
        this.store.dispatch(getMessages());
    }
}
