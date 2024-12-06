import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  AdminCreateUserPageComponent  } from './admin-create-user.component';

describe('RecruiterPostJobPageComponent', () => {
  let component:  AdminCreateUserPageComponent ;
  let fixture: ComponentFixture< AdminCreateUserPageComponent >;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCreateUserPageComponent ]
    });
    fixture = TestBed.createComponent( AdminCreateUserPageComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
