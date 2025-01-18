import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterCalenderComponent } from './recruiter-calender.component';

describe('RecruiterCalenderComponent', () => {
  let component: RecruiterCalenderComponent;
  let fixture: ComponentFixture<RecruiterCalenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecruiterCalenderComponent]
    });
    fixture = TestBed.createComponent(RecruiterCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
