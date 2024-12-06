import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterConfirmationComponent } from './recruiter-account-confirmation.component';

describe('RecruiterComponent', () => {
  let component: RecruiterConfirmationComponent;
  let fixture: ComponentFixture<RecruiterConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecruiterConfirmationComponent]
    });
    fixture = TestBed.createComponent(RecruiterConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
