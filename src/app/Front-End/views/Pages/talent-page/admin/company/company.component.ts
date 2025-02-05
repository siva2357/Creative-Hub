import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit{
    logoUploadUrl: string | ArrayBuffer | null = null;
    companyPostForm!: FormGroup;
    errorMessage: string = '';
    jobCreated:boolean=false;
    isLoading:boolean=false;
    isSubmitting:boolean=false;

  constructor(private fb: FormBuilder,private router: Router ) {}

  ngOnInit(): void{

    this.initializeForm();
  }

  
    initializeForm() {
      this.companyPostForm = this.fb.group({
        _id: [null],
        companyId: ['', [Validators.required]],
        companyLogo: ['', [Validators.required]],
        companyName: ['', [Validators.required]],
        companyType: ['', [Validators.required]],
        companyWebsite: ['', [Validators.required]],
        companyDescription: ['', [Validators.required]],
        companyDivision: ['', [Validators.required]],
        companyCareer: ['', [Validators.required]],
      });
    }
  
    
  submitCompany() {
  }

  goToCompanyDetails(): void {
    this.router.navigateByUrl('talent-page/admin/company-details/:id');
  }


}
