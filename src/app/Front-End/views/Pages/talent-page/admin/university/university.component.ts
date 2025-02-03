import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})

export class UniversityComponent implements OnInit{

  logoUploadUrl: string | ArrayBuffer | null = null;

  universityPostForm!: FormGroup;
  errorMessage: string = '';
  jobCreated:boolean=false;
  isLoading:boolean=false;
  isSubmitting:boolean=false;


  constructor(private fb: FormBuilder,private router: Router ) {}

  ngOnInit(): void{

    this.initializeForm();
  }

  initializeForm() {
    this.universityPostForm = this.fb.group({
      _id: [null],
      universityId: ['', [Validators.required]],
      universityLogo: ['', [Validators.required]],
      universityName: ['', [Validators.required]],
      universityType: ['', [Validators.required]],
      universityWebsite: ['', [Validators.required]],
      universityDescription: ['', [Validators.required]],
      universityProgram: ['', [Validators.required]],
      universityCourse: ['', [Validators.required]],
    });
  }



  submitUniversity() {
  }

  
  goToUniversityDetails(): void {
    this.router.navigateByUrl('talent-page/admin/university-details/:id');
  }
}