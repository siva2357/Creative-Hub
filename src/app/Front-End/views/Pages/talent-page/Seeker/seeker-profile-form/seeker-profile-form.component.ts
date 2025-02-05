import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-seeker-profile-form',
  templateUrl: './seeker-profile-form.component.html',
  styleUrls: ['./seeker-profile-form.component.css']
})



export class SeekerProfileFormComponent{

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

      institute: ['', [Validators.required]],
      degree: ['', [Validators.required]],
      department: ['', [Validators.required]],
      branch: ['', [Validators.required]],
      yearsOfStudying: ['', [Validators.required]],
      instituteNumber: ['', [Validators.required]],

      bioDetails: ['', [Validators.required]],
      profilePicture: ['', [Validators.required]]

    });
  }



  submitProfile() {}
}
