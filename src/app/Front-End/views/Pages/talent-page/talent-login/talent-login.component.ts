import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Front-End/core/services/auth.service';
import { AlertService } from 'src/app/Front-End/core/services/alerts.service';

@Component({
  selector: 'app-talent-login',
  templateUrl: './talent-login.component.html',
  styleUrls: ['./talent-login.component.css']
})
export class TalentLoginComponent {
  loginDetails!: FormGroup;

  isLoading: boolean = false;
  loginSuccess: boolean = false; 

  submitted = false;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private alertService:AlertService) {
    this.loginDetails = this.formBuilder.group({
      // email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)]],
      // password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],

      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  // Get form controls
  get f() { return this.loginDetails.controls; }


  onSubmit() {
    this.submitted = true; // This indicates that the form has been submitted

    // Log the form value for debugging
    console.log('Form Submitted:', this.loginDetails.value);
    
    // Stop if form is invalid and mark all controls as touched
    if (this.loginDetails.invalid) {
        console.log('Form is invalid');
        // Mark all controls as touched to show validation messages
        Object.keys(this.loginDetails.controls).forEach(controlName => {
            this.loginDetails.get(controlName)?.markAsTouched();
        });
        return;
    }

    this.isLoading = true; // Start loading spinner or indication

    // Call the login API
    this.authService.login(this.loginDetails.value).subscribe(
        response => {
            console.log('Login response:', response); 
            this.alertService.showLoginSuccess(); // Show success alert
            this.loginSuccess = true;
            
            const userType = response.role;
            this.authService.setUserRole(userType);

            // Delay for 3 seconds before navigating
            setTimeout(() => {
                this.isLoading = false; // Stop loading indicator

                // Navigate based on the user role after the delay
                if (userType === 'recruiter') {
                  this.router.navigate(['talent-page/recruiter']); // Redirect to Recruiter's Dashboard
                } else if (userType === 'seeker') {
                    this.router.navigate(['talent-page/seeker']);
                } else if (userType === 'admin') {
                    this.router.navigate(['talent-page/admin']);
                } else {
                    console.warn('Unknown user role:', userType);
                }
            }, 3000);
        },
        error => {
            console.error('Login error:', error);
            this.errorMessage = 'Invalid credentials'; // Show error message to user
            this.isLoading = false; // Stop loading indicator on error
        }
    );
}




  
  login() {
    this.router.navigate(['talent-page/login']); // Corrected navigation
  }

  // Navigate to register page
  register() {
    this.router.navigate(['talent-page/signup']); // Corrected navigation
  }
}
