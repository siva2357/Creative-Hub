import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  RecruiterBasicDetailsComponent  } from './recruiter-basic-details.component';

describe('RecruiterBasicDetailsComponent', () => {
  let component:   RecruiterBasicDetailsComponent ;
  let fixture: ComponentFixture< RecruiterBasicDetailsComponent >;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterBasicDetailsComponent ]
    });
    fixture = TestBed.createComponent( RecruiterBasicDetailsComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
