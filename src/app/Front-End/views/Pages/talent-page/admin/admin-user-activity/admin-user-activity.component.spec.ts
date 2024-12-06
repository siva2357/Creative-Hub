import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserActivityPageComponent } from './admin-user-activity.component';

describe('AdminUserActivityPageComponent', () => {
  let component: AdminUserActivityPageComponent ;
  let fixture: ComponentFixture<AdminUserActivityPageComponent >;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUserActivityPageComponent ]
    });
    fixture = TestBed.createComponent(AdminUserActivityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
