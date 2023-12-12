import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestComponent } from './test.component';
import { provideStore } from '@ngrx/store';
import { reducers } from '../../store/reducers/app.reducers';

describe('ComponentTestComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestComponent],
            providers: [provideStore(reducers)],
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
