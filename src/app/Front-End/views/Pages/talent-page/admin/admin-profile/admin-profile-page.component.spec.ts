import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfilePageComponent  } from './admin-profile-page.component';

describe('AdminProfilePageComponent ', () => {
  let component: AdminProfilePageComponent  ;
  let fixture: ComponentFixture<AdminProfilePageComponent  >;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminProfilePageComponent  ]
    });
    fixture = TestBed.createComponent(AdminProfilePageComponent  );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
