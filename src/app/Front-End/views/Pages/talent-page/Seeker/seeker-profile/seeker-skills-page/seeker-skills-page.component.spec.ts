import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerSkillsPageComponent  } from './seeker-skills-page.component';

describe('SeekerSkillsPageComponent', () => {
  let component:  SeekerSkillsPageComponent ;
  let fixture: ComponentFixture< SeekerSkillsPageComponent >;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SeekerSkillsPageComponent ]
    });
    fixture = TestBed.createComponent( SeekerSkillsPageComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
