import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-seeker',
  templateUrl: './register-seeker.component.html',
  styleUrls: ['./register-seeker.component.css']
})

export class RegisterSeekerComponent implements OnInit {
  registrationForm!: FormGroup;
  registrationSuccess: boolean = false;
  step = 1;
  isLoading: boolean = false;
  isSubmitting = false;
  errorMessage = '';


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registrationForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  get controls() {
    return this.registrationForm.controls;
  }

  passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword
      ? { mismatch: true }
      : null;
  }

  next(): void {
    if (this.step === 1) {
      if (this.registrationForm.get('fullName')?.invalid || this.registrationForm.get('userName')?.invalid || this.registrationForm.get('email')?.invalid) {
        return;
      }
      this.step++;
    }
    if (this.step === 2) {
      if (this.registrationForm.get('password')?.invalid || this.registrationForm.get('confirmPassword')?.invalid) {
        return;
      }
      this.submit();
    }
  }

  isStepValid(): boolean {
    switch (this.step) {
      case 1:
        return (this.registrationForm.get('fullName')?.valid ?? false) &&
               (this.registrationForm.get('userName')?.valid ?? false) &&
               (this.registrationForm.get('email')?.valid ?? false);
      case 2:
        return (this.registrationForm.get('password')?.valid ?? false) &&
               (this.registrationForm.get('confirmPassword')?.valid ?? false);
      default:
        return false;
    }

  }



  previous(): void {
    if (this.step > 1) {
      this.step--;
    }
  }



  submit() {
  }

  LoginPage(): void {
    this.router.navigate(['talent-page/login']);
  }

  back(): void {
    this.router.navigate(['talent-page/signup']);
  }
}
