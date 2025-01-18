import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterReportsComponent } from './recruiter-reports.component';

describe('RecruiterReportsComponent', () => {
  let component: RecruiterReportsComponent;
  let fixture: ComponentFixture<RecruiterReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecruiterReportsComponent]
    });
    fixture = TestBed.createComponent(RecruiterReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
