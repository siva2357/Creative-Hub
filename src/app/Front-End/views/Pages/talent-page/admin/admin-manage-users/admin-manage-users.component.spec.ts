import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageUserPageComponent } from './admin-manage-users.component';

describe('AdminManageUserPageComponent', () => {
  let component: AdminManageUserPageComponent ;
  let fixture: ComponentFixture<AdminManageUserPageComponent >;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminManageUserPageComponent ]
    });
    fixture = TestBed.createComponent(AdminManageUserPageComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
