import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Front-End/core/services/auth.service';
import { Recruiter } from 'src/app/Front-End/core/models/user.model';
import { AlertService } from 'src/app/Front-End/core/services/alerts.service';

@Component({
  selector: 'app-register-recruiter',
  templateUrl: './register-recruiter.component.html',
  styleUrls: ['./register-recruiter.component.css']
})
export class RegisterRecruiterComponent implements OnInit {
  signupDetails!: FormGroup;
  contactDetails!: FormGroup;
  professionalDetails!: FormGroup;
  bioDetails!: FormGroup;
  profileDetails!: FormGroup;

  registrationSuccess: boolean = false; 
  

  cities: string[] = ['Hyderabad', 'Mumbai', 'Delhi', 'Chennai'];
  states: string[] = ['Telangana', 'Maharashtra', 'Karnataka', 'Tamil Nadu'];
  countries: string[] = ['Telangana', 'Maharashtra', 'Karnataka', 'Tamil Nadu'];
  genders: string[] = ['Male', 'Female', 'Other'];


  
  companyNames: string[] = ['A', 'B', 'C', 'D'];
  departmentNames: string[] = ['I', 'J', 'K', 'L'];
  jobLevels: string[] = ['M', 'N', 'O', 'P'];

  step = 1;
  profileUploadUrl: string | ArrayBuffer | null = null;
  isImageUploaded: boolean = false;
  isLoading: boolean = false;


  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private authService: AuthService, 
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.initializeForms();
  }

    initializeForms(): void {
    this.signupDetails = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required]], 
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });

    this.contactDetails = this.formBuilder.group({
      phoneNumber: ['', [Validators.required]], 
      streetAddress: ['', [Validators.required]],
      city: ['',[Validators.required]],
      state: ['',[Validators.required]], 
      country: ['',[Validators.required]], 
      pincode: ['', [Validators.required]]
    });

    this.professionalDetails = this.formBuilder.group({
      companyName: ['',[Validators.required]],
      departmentName: ['',[Validators.required]], 
      designation: ['',[Validators.required]], 
      jobLevel: ['',[Validators.required]], 
      experience: ['', [Validators.required]],
      companyId: ['', [Validators.required]]
    });

    this.bioDetails = this.formBuilder.group({
      bio: ['',[Validators.required]]
    });
  
    this.profileDetails = this.formBuilder.group({
      profileUpload: [null, Validators.required]
    });
  }

  
  get signup() { return this.signupDetails.controls; }
  get contact() { return this.contactDetails.controls; }
  get professional() { return this.professionalDetails.controls; }
  get bio() { return this.bioDetails.controls; }
  get profile() { return this.profileDetails.controls; }


  next(): void {
    switch (this.step) {
      case 1:
        if (this.signupDetails.invalid) {
          this.signupDetails.markAllAsTouched(); // Highlight errors
          return;
        }
        break;
      case 2:
        if (this.contactDetails.invalid) {
          this.contactDetails.markAllAsTouched(); // Highlight errors
          return;
        }
        break;
      case 3:
        if (this.professionalDetails.invalid) {
          this.professionalDetails.markAllAsTouched(); // Highlight errors
          return;
        }
        break;
      case 4:
        if (this.bioDetails.invalid) {
          this.bioDetails.markAllAsTouched(); // Highlight errors
          return;
        }
        break;
      case 5:
        if (this.profileDetails.invalid) {
          this.profileDetails.markAllAsTouched(); // Highlight errors
          return;
        }
        this.submit(); // Submit only at step 5
        return; // Prevent further step increment
    }
  
    this.step++; // Increment step after validation
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
      this.profileDetails.get('profileUpload')?.setErrors(null); // Clear previous errors

      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        this.profileDetails.get('profileUpload')?.setErrors({ invalidFileType: true });
        this.alertService.showProfileImageFormatAlert();
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.profileUploadUrl = reader.result; // Set the uploaded image URL
        this.isImageUploaded = true;
      };
      reader.readAsDataURL(file);
    } else {
      this.profileDetails.get('profileUpload')?.setErrors({ required: true });
      this.alertService.showProfileImageAlert();
    }
  }

  submit(): void {
    if (
      this.signupDetails.valid &&
      this.contactDetails.valid &&
      this.professionalDetails.valid &&
      this.bioDetails.valid &&
      this.profileDetails.valid
    ) {
      if (this.signupDetails.value.password !== this.signupDetails.value.confirmPassword) {
        console.error('Passwords do not match');
        return;
      }
  
      const recruiterData: Recruiter = {
        registrationDetails: {
          signupDetails: {
            fullName: this.signupDetails.value.fullName,
            userName: this.signupDetails.value.userName,
            gender: this.signupDetails.value.gender,
            email: this.signupDetails.value.email,
            password: this.signupDetails.value.password,
            confirmPassword: this.signupDetails.value.confirmPassword,
          },
          contactDetails: {
            phoneNumber: this.contactDetails.value.phoneNumber,
            streetAddress: this.contactDetails.value.streetAddress,
            city: this.contactDetails.value.city,
            state: this.contactDetails.value.state,
            country: this.contactDetails.value.country,
            pincode: this.contactDetails.value.pincode,
          },
          professionalDetails: {
            companyName: this.professionalDetails.value.companyName,
            departmentName: this.professionalDetails.value.departmentName,
            designation: this.professionalDetails.value.designation,
            jobLevel: this.professionalDetails.value.jobLevel,
            experience: this.professionalDetails.value.experience,
            companyId: this.professionalDetails.value.companyId,
          },
          bioDetails: {
            bio: this.bioDetails.value.bio,
          },
          profileDetails: {
            profilePicture: this.profileDetails.value.profileUpload
          },
        },
      };
  
      this.isLoading = true;
  
      this.authService.registerRecruiter(recruiterData).subscribe(
        (response) => {
          console.log('Registration successful', response);
          this.registrationSuccess = true;
          this.alertService.showAccountRegisteredSuccess();
          setTimeout(() => {
            this.isLoading = false;
            this.router.navigate(['talent-page/register/confirmation-page']);
          }, 3000);
        },
  
        (error) => {
          this.registrationSuccess = false; 
          console.error('Registration failed', error);
          this.alertService.showErrorRegisteringAccount();
          setTimeout(() => {
            this.isLoading = false;
            this.router.navigate(['talent-page/register/error-page']);
          }, 3000); 
        }
      );
    }
  }
  

  

  LoginPage(): void {
    this.router.navigate(['talent-page/login']);
  }

  back(): void {
    this.router.navigate(['talent-page/signup']);
  }
}
