import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  SeekerBasicDetailsComponent  } from './seeker-basic-details.component';

describe(' SeekerBasicDetailsComponent', () => {
  let component:   SeekerBasicDetailsComponent ;
  let fixture: ComponentFixture<  SeekerBasicDetailsComponent >;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [  SeekerBasicDetailsComponent ]
    });
    fixture = TestBed.createComponent(  SeekerBasicDetailsComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
