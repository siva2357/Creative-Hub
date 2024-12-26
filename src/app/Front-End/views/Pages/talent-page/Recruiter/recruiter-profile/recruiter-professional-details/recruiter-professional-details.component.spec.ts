import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterProfessionalDetailsComponent  } from './recruiter-professional-details.component';

describe('RecruiterProfessionalDetailsComponent', () => {
  let component:  RecruiterProfessionalDetailsComponent ;
  let fixture: ComponentFixture< RecruiterProfessionalDetailsComponent >;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterProfessionalDetailsComponent ]
    });
    fixture = TestBed.createComponent(RecruiterProfessionalDetailsComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
