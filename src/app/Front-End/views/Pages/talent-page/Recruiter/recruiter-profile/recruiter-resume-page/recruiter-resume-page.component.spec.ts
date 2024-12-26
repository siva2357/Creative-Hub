import { ComponentFixture, TestBed } from '@angular/core/testing';

import {   RecruiterResumePageComponent  } from './recruiter-resume-page.component';

describe(' RecruiterResumePageComponent', () => {
  let component:    RecruiterResumePageComponent ;
  let fixture: ComponentFixture<  RecruiterResumePageComponent >;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [  RecruiterResumePageComponent ]
    });
    fixture = TestBed.createComponent(  RecruiterResumePageComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
