import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recruiter-profile-form',
  templateUrl: './recruiter-profile-form.component.html',
  styleUrls: ['./recruiter-profile-form.component.css']
})

export class RecruiterProfileFormComponent{

  profileDetailsForm!: FormGroup;
  errorMessage: string = '';
  jobCreated:boolean=false;
  isLoading:boolean=false;
  isSubmitting:boolean=false;
  ifPreview:boolean=false;


  constructor(private fb: FormBuilder) {}

  ngOnInit(): void{

    this.initializeForm();
  }

  initializeForm() {
    this.profileDetailsForm = this.fb.group({
      _id: [null],
      fullName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      gender: ['', [Validators.required]],

      phoneNumber: ['', [Validators.required]],
      streetAddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      pincode: ['', [Validators.required]],

      companyName: ['', [Validators.required]],
      departmentName: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      jobLevel: ['', [Validators.required]],
      experience: ['', [Validators.required]],
      employeeCode: ['', [Validators.required]],

      bioDetails: ['', [Validators.required]],
      profilePicture: ['', [Validators.required]]

    });
  }



  submitProfile() {}
}
