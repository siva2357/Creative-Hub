import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerProjectPageComponent } from './seeker-project-page.component';

describe('RecruiterMainPageComponent', () => {
  let component:  SeekerProjectPageComponent ;
  let fixture: ComponentFixture< SeekerProjectPageComponent >;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeekerProjectPageComponent ]
    });
    fixture = TestBed.createComponent( SeekerProjectPageComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
