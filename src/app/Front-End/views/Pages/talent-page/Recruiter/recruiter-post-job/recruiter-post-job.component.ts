import { Component, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { JobPost } from 'src/app/Front-End/core/models/jobPost.model';
import { AlertService } from 'src/app/Front-End/core/services/alerts.service';
import { JobPostService } from 'src/app/Front-End/core/services/job-post.service';

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


  constructor(private fb: FormBuilder, private jobPostService: JobPostService, private alert:AlertService ) {}

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
    if (this.jobPostForm.valid) {
      this.isSubmitting = true;
      this.isLoading = true;
      const jobPostData: JobPost = this.jobPostForm.value;
      this.jobPostService.createJobPost(jobPostData).subscribe({
        next: (response) => {
          setTimeout(() => {
            this.isSubmitting = false;
            this.isLoading = false;
            this.jobCreated = true;
            this.alert. showJobCreatedSuccess(); 
            this.jobPostForm.reset({
              jobType:'', 
              jobLevel: '',
  
              category: '',
              skills:'',
              proficiency:'',
              language:'',
  
              salary: '',
              benefits: '',
            });
          }, 2000);
        },
        error: () => {
          this.isLoading = false;
          this.alert.showErrorJobCreating();
        }
      });



    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
      this.alert.showJobFieildsError();
    }
  }
}


