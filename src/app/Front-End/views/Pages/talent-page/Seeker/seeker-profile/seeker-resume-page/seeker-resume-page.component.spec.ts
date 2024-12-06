import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  SeekerResumePageComponent  } from './seeker-resume-page.component';

describe(' SeekerResumePageComponent', () => {
  let component:   SeekerResumePageComponent ;
  let fixture: ComponentFixture<  SeekerResumePageComponent >;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [  SeekerResumePageComponent ]
    });
    fixture = TestBed.createComponent(  SeekerResumePageComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
