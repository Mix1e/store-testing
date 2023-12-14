import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestComponent } from './test.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../store/models/initial-state.const';
import { MessageComponent } from '../message/message.component';
import { EState, IMessageItem, IMessageModel } from '../../store/models/messages-model.interface';
import { addFavouriteMessage } from '../../store/actions/favourite.actions';
import { allMessages, IAppState } from '../../store/selectors/app.selectors';
import { By } from '@angular/platform-browser';
import { MemoizedSelector } from '@ngrx/store';

const messagesStub: IMessageItem[] = [
    {
        id: 1,
        content: 'Hello World!',
    },
    {
        id: 2,
        content: 'BABABA',
    },
    {
        id: 3,
        content: 'BEBEBE',
    },
];

describe('ComponentTestComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let store: MockStore;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestComponent, MessageComponent],
            providers: [provideMockStore({ initialState })],
        }).compileComponents();

        store = TestBed.inject(MockStore);
        store.setState({
            messages: {
                all: initialState,
                favourite: initialState,
                deleted: initialState,
            },
        });
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        spyOn(store, 'dispatch').and.callFake(() => {});
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('unfavourite message', () => {
        const message: IMessageItem = messagesStub[0];

        // Можно заменить на реальное нажатие кнопки
        component.addToFavourite(message);

        expect(store.dispatch).toHaveBeenCalledWith(addFavouriteMessage({ message }));
    });

    describe('selectors', () => {
        let mockMessagesSelector: MemoizedSelector<IAppState, IMessageModel>;
        const model: IMessageModel = {
            state: EState.READY,
            messages: messagesStub,
        };
        beforeEach(() => {
            mockMessagesSelector = store.overrideSelector(allMessages, model);
            store.refreshState();
            fixture.detectChanges();
        });

        it('should render all messages', () => {
            expect(fixture.debugElement.queryAll(By.css('.test')).length).toBe(3);
        });

        it('should update UI when the selector changes', () => {
            mockMessagesSelector.setResult({
                state: EState.READY,
                messages: [messagesStub[0]],
            });
            store.refreshState();
            fixture.detectChanges();

            expect(fixture.debugElement.queryAll(By.css('.test')).length).toBe(1);
        });
    });
});
