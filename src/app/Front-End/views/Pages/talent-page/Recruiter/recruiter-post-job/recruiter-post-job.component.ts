import { Component, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-recruiter-post-job',
  templateUrl: './recruiter-post-job.component.html',
  styleUrls: ['./recruiter-post-job.component.css']
})
export class RecruiterPostJobPageComponent {

  jobPostForm!: FormGroup;
  errorMessage: string = '';
  jobCreated:boolean=false;
  isLoading:boolean=false;
  isSubmitting:boolean=false;


  constructor(private fb: FormBuilder) {}

  ngOnInit(): void{

    this.initializeForm();
  }

  initializeForm() {
    this.jobPostForm = this.fb.group({
      _id: [null],
      jobId: ['', [Validators.required]],
      jobRoleTitle: ['', [Validators.required]],
      jobType: ['', [Validators.required]],
      jobLevel: ['', [Validators.required]],

      category: ['', [Validators.required]],
      skills: ['', [Validators.required]],
      proficiency: ['', [Validators.required]],
      language: ['', [Validators.required]],

      salary: ['', [Validators.required]],
      experience: ['', [Validators.required]],
      location: ['', [Validators.required]],
      vacancy: ['', [Validators.required]],

      benefits: ['', [Validators.required]],
      applyByDate: ['', [Validators.required]],

      jobDescription: ['', [Validators.required]],

      status: ['active']
    });
  }



  submitJobPost() {
  }
}


