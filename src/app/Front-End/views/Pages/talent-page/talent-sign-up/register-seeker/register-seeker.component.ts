import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Seeker } from 'src/app/Front-End/core/models/user.model';
import { AuthService } from 'src/app/Front-End/core/services/auth.service';


@Component({
  selector: 'app-register-seeker',
  templateUrl: './register-seeker.component.html',
  styleUrls: ['./register-seeker.component.css']
})

export class RegisterSeekerComponent implements OnInit {
   registrationForm!: FormGroup;
    step = 1;
    isLoading: boolean = false;
    isSubmitting = false;
    errorMessage = '';
    registrationSuccess: boolean = false; 
    seeker!: Seeker 
    constructor(private formBuilder: FormBuilder, private router: Router, private authService : AuthService) {}
  
    ngOnInit(): void {
      this.initializeForm();
    }
  
    initializeForm(): void {
      this.registrationForm = this.formBuilder.group({
        _id: [null], // ✅ For fetching and updating user details
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        userName: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        role: ['seeker']
      }, { validators: this.passwordMatchValidator });
    }
  
    get controls() {
      return this.registrationForm.controls;
    }
  
    passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('confirmPassword')?.value;
      return password && confirmPassword && password !== confirmPassword ? { mismatch: true } : null;
    }
  
    next(): void {
      if (!this.isStepValid()) {
        return; 
      }
      this.step++;
    }
  
    previous(): void {
      if (this.step > 1) {
        this.step--;
      }
    }
  
    isStepValid(): boolean {
      switch (this.step) {
        case 1:
          return (this.registrationForm.get('firstName')?.valid ?? false) &&
                 (this.registrationForm.get('lastName')?.valid ?? false) &&
                 (this.registrationForm.get('userName')?.valid ?? false) &&
                 (this.registrationForm.get('email')?.valid ?? false);
        case 2:
          return (this.registrationForm.get('password')?.valid ?? false) &&
                 (this.registrationForm.get('confirmPassword')?.valid ?? false);
        default:
          return false;
      }
    }
  
  
  
  
    submit(): void {
      if (this.registrationForm.valid) {
        const seekerData: Seeker = {
          registrationDetails: {
            firstName: this.registrationForm.value.firstName,
            lastName: this.registrationForm.value.lastName,
            userName: this.registrationForm.value.userName,
            email: this.registrationForm.value.email,
            password: this.registrationForm.value.password, // Will be optional on the backend
          },
          role: 'seeker',
        };
    
        this.isLoading = true;
    
        this.authService.registerSeeker(seekerData).subscribe(
          (response: any) => {
            console.log('Registration successful', response);
            this.registrationSuccess = true;
              this.isLoading = false;
              this.router.navigate(['talent-page/register/otp-verification'], {
                queryParams: { email: seekerData.registrationDetails.email }
              });
            
          },
          (error: any) => {
            this.isLoading = false;
            console.error('Registration failed', error);
          }
        );
      }
    }
    
    
    
  
    goToLogin(): void {
      this.router.navigate(['talent-page/login']);
    }
  
    goBack(): void {
      this.router.navigate(['talent-page/signup']);
    }
}
