import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterProjectPageComponent } from './recruiter-project-page.component';

describe('RecruiterProjectPageComponent', () => {
  let component:  RecruiterProjectPageComponent ;
  let fixture: ComponentFixture< RecruiterProjectPageComponent >;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecruiterProjectPageComponent ]
    });
    fixture = TestBed.createComponent( RecruiterProjectPageComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
