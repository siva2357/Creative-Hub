import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterSkillsPageComponent } from './recruiter-skills-page.component';

describe('RecruiterSkillsPageComponent', () => {
  let component:  RecruiterSkillsPageComponent ;
  let fixture: ComponentFixture< RecruiterSkillsPageComponent >;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterSkillsPageComponent ]
    });
    fixture = TestBed.createComponent( RecruiterSkillsPageComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
