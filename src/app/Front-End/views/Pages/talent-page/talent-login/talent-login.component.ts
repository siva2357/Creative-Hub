import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private formBuilder: FormBuilder, private router: Router) {
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
}


  // Navigate to register page
  register() {
    this.router.navigate(['talent-page/signup']); // Corrected navigation
  }
}
