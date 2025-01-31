import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityCompanyLocationComponent } from './university-company-location.component';

describe('UniversityCompanyLocationComponent', () => {
  let component: UniversityCompanyLocationComponent;
  let fixture: ComponentFixture<UniversityCompanyLocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UniversityCompanyLocationComponent]
    });
    fixture = TestBed.createComponent(UniversityCompanyLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
