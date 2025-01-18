import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterInterviewPageComponent  } from './recruiter-interview.component';

describe('RecruiterInterviewPageComponent', () => {
  let component:  RecruiterInterviewPageComponent ;
  let fixture: ComponentFixture< RecruiterInterviewPageComponent >;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecruiterInterviewPageComponent ]
    });
    fixture = TestBed.createComponent(RecruiterInterviewPageComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
