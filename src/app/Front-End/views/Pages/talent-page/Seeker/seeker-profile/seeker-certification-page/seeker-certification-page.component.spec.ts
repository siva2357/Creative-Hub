import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  SeekerCertificationPageComponent } from './seeker-certification-page.component';

describe(' SeekerCertificationPageComponent', () => {
  let component:   SeekerCertificationPageComponent ;
  let fixture: ComponentFixture<  SeekerCertificationPageComponent >;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SeekerCertificationPageComponent ]
    });
    fixture = TestBed.createComponent(  SeekerCertificationPageComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
