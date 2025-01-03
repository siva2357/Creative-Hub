import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterScheduleInterviewComponent } from './recruiter-schedule-interview.component';

describe('RecruiterScheduleInterviewComponent', () => {
  let component: RecruiterScheduleInterviewComponent;
  let fixture: ComponentFixture<RecruiterScheduleInterviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecruiterScheduleInterviewComponent]
    });
    fixture = TestBed.createComponent(RecruiterScheduleInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
