import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  SeekerResumeBuilderPageComponent  } from './seeker-resume-builder-page.component';

describe(' SeekerResumeBuilderPageComponent', () => {
  let component:   SeekerResumeBuilderPageComponent ;
  let fixture: ComponentFixture<  SeekerResumeBuilderPageComponent >;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [  SeekerResumeBuilderPageComponent ]
    });
    fixture = TestBed.createComponent(  SeekerResumeBuilderPageComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
