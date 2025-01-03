import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerInterviewComponent } from './seeker-interview.component';

describe('SeekerInterviewComponent', () => {
  let component: SeekerInterviewComponent;
  let fixture: ComponentFixture<SeekerInterviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeekerInterviewComponent]
    });
    fixture = TestBed.createComponent(SeekerInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
