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
    @Output() like: EventEmitter<IMessageItem> = new EventEmitter<IMessageItem>();
    @Output() delete: EventEmitter<IMessageItem> = new EventEmitter<IMessageItem>();
}
