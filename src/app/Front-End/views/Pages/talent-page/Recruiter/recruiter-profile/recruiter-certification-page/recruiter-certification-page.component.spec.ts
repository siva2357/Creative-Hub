import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  RecruiterCertificationPageComponent } from './recruiter-certification-page.component';

describe(' RecruiterCertificationPageComponent', () => {
  let component:   RecruiterCertificationPageComponent ;
  let fixture: ComponentFixture< RecruiterCertificationPageComponent >;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecruiterCertificationPageComponent ]
    });
    fixture = TestBed.createComponent( RecruiterCertificationPageComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
