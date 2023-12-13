import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMessageItem } from '../../store/models/messages-model.interface';

@Component({
    selector: 'app-message',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './message.component.html',
    styleUrl: './message.component.scss',
})
export class MessageComponent {
    @Input() message!: IMessageItem;
    @Input() type!: 'favourite' | 'deleted' | 'all';
    @Output() addToFavourite: EventEmitter<IMessageItem> = new EventEmitter<IMessageItem>();
    @Output() unFavourite: EventEmitter<IMessageItem> = new EventEmitter<IMessageItem>();
    @Output() addToDeleted: EventEmitter<IMessageItem> = new EventEmitter<IMessageItem>();
    @Output() unDelete: EventEmitter<IMessageItem> = new EventEmitter<IMessageItem>();
}
