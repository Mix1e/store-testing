import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {select, Store} from "@ngrx/store";
import {getItems} from "../../store/app.actions";
import {Observable, of, tap} from "rxjs";
import {isLoadingSelector} from "../../store/app.selectors";

@Component({
    selector: 'app-test',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './test.component.html',
})
export class TestComponent {
    public isLoading$: Observable<boolean> = of(false);

    constructor(private store: Store) {
        this.isLoading$ = this.store.pipe(select(isLoadingSelector), tap(console.log));
    }


    sendData(): void {
        this.store.dispatch(getItems());
    }
}
