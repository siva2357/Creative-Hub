import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterMeetingComponent } from './recruiter-meeting.component';

describe('RecruiterMeetingComponent', () => {
  let component: RecruiterMeetingComponent;
  let fixture: ComponentFixture<RecruiterMeetingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecruiterMeetingComponent]
    });
    fixture = TestBed.createComponent(RecruiterMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
