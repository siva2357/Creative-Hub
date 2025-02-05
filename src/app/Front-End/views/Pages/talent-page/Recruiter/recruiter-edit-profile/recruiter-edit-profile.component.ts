import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recruiter-edit-profile',
  templateUrl: './recruiter-edit-profile.component.html',
  styleUrls: ['./recruiter-edit-profile.component.css']
})

export class  RecruiterEditProfileComponent{

  profileDetailsForm!: FormGroup;
  errorMessage: string = '';
  jobCreated:boolean=false;
  isLoading:boolean=false;
  isSubmitting:boolean=false;
  ifPreview:boolean=false;


  constructor(private fb: FormBuilder, private router:Router) {}

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



  updateProfile() {}

  goBack() {
    this.router.navigateByUrl('talent-page/recruiter/profile')
  }
}
