import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerEducationDetailsComponent  } from './seeker-education-details.component';

describe('RecruiterMainPageComponent', () => {
  let component:  SeekerEducationDetailsComponent ;
  let fixture: ComponentFixture< SeekerEducationDetailsComponent >;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SeekerEducationDetailsComponent ]
    });
    fixture = TestBed.createComponent(SeekerEducationDetailsComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
