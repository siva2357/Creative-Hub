import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerConfirmationComponent } from './seeker-account-confirmation.component';

describe('RecruiterComponent', () => {
  let component: SeekerConfirmationComponent;
  let fixture: ComponentFixture<SeekerConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeekerConfirmationComponent]
    });
    fixture = TestBed.createComponent(SeekerConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
