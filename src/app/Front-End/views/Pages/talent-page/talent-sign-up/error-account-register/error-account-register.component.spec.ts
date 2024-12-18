import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorRegisterComponent } from './account-confirmation.component';

describe('ErrorRegisterComponent', () => {
  let component: ErrorRegisterComponent;
  let fixture: ComponentFixture<ErrorRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorRegisterComponent]
    });
    fixture = TestBed.createComponent(ErrorRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
