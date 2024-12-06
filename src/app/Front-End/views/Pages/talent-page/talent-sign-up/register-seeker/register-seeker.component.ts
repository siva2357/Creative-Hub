import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Front-End/core/services/auth.service';
import { Seeker } from 'src/app/Front-End/core/models/user.model';
import { AlertService } from 'src/app/Front-End/core/services/alerts.service';


@Component({
  selector: 'app-register-seeker',
  templateUrl: './register-seeker.component.html',
  styleUrls: ['./register-seeker.component.css']
})

export class RegisterSeekerComponent implements OnInit {
  signupDetails!: FormGroup;
  profileDetails!: FormGroup;

  registrationSuccess :boolean = false; 

  step = 1;
  profileUploadUrl: string | ArrayBuffer | null = null;
  isImageUploaded: boolean = false;
  isLoading: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private alertService: AlertService ) {}

  ngOnInit(): void {
    this.initializeForms();
  }

  initializeForms(): void {
    this.signupDetails = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z\s]+$/)]], // Capital letter, only letters
      userName: ['', [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z0-9]+$/)]], // Starts with capital, letters and numbers
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)]], // Letters, numbers, ends with @gmail.com
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]], // Strong password
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  

    this.profileDetails = this.formBuilder.group({
      profileUpload: [null, Validators.required]
    });
  }

  get signup() { return this.signupDetails.controls; }
  get profile() { return this.profileDetails.controls; }


  next(): void {
    if (this.signupDetails.invalid) {
        if (this.signupDetails.get('fullName')?.invalid) {
        }
        if (this.signupDetails.get('userName')?.invalid) {
        }
        if (this.signupDetails.get('email')?.invalid) {
        }
        if (this.signupDetails.get('password')?.invalid) {
        }
        if (this.signupDetails.get('confirmPassword')?.invalid) {
        } else if (this.signupDetails.hasError('mismatch')) {
        }
        return;
    }
    this.step++;
}




  previous(): void {
    if (this.step > 1) {
      this.step--;
    }
  }


  passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password && confirmPassword) {
        return password === confirmPassword ? null : { mismatch: true };
    }
    return null;
}

  handleFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      this.profileDetails.get('profileUpload')?.setErrors(null);
  

      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        this.profileDetails.get('profileUpload')?.setErrors({ invalidFileType: true });
        this.alertService.showProfileImageFormatAlert();
        return;
      }
  
      const reader = new FileReader();
      reader.onload = () => {
        this.profileUploadUrl = reader.result;
        this.isImageUploaded = true;
      };
      reader.readAsDataURL(file);
    } else {
      this.profileDetails.get('profileUpload')?.setErrors({ required: true });
      this.alertService.showProfileImageAlert();
    }
  }
  

  submit(): void {
    if (this.signupDetails.valid && this.profileDetails.valid) {
      const seekerData: Seeker = {
        registrationDetails: {
          signupDetails: {
            fullName: this.signupDetails.value.fullName,
            userName: this.signupDetails.value.userName,
            email: this.signupDetails.value.email,
            password: this.signupDetails.value.password,
            confirmPassword: this.signupDetails.value.confirmPassword
          },
          profileDetails: {
            profilePicture: this.profileDetails.value.profileUpload 
          }
        }
      };
  
      this.isLoading = true; 
  
      this.authService.registerSeeker(seekerData).subscribe(
        response => {

          console.log('Registration successful', response);
          this.alertService.showAccountRegisteredSuccess();
          this.registrationSuccess=true;

          setTimeout(() => {
            this.isLoading = false;
            this.router.navigate(['talent-page/register/seeker/account-confirmation']); 
          }, 3000);
        },
        error => {
          this.isLoading = false; 
          this.alertService.showErrorRegisteringAccount(); 
          console.error('Registration failed', error);
        }
      );
    }
  }
  

  LoginPage(): void {
    this.router.navigate(['talent-page/talent-login']);
  }

  back(): void {
    this.router.navigate(['talent-page/talent-signup']);
  }
}








