import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seeker-edit-profile',
  templateUrl: './seeker-edit-profile.component.html',
  styleUrls: ['./seeker-edit-profile.component.css']
})

export class SeekerEditProfileComponent {

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



  updateProfile() {}

  goBack() {
    this.router.navigateByUrl('talent-page/seeker/profile')
  }
}