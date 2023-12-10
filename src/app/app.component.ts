import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {TestComponent} from "./components/test/test.component";
import {MessageService} from "./services/message.service";

@Component({
    imports: [
        CommonModule,
        RouterOutlet,
        TestComponent,
    ],
    providers: [
    ],
    selector: 'app-root',
    standalone: true,
    styleUrl: './app.component.scss',
    templateUrl: './app.component.html',
})
export class AppComponent {
    title = 'store-testing';
}
