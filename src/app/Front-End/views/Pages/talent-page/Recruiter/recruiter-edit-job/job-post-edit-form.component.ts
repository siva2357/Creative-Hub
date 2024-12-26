import { Component, OnInit, Input} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JobPost } from 'src/app/Front-End/core/models/jobPost.model';
import { AlertService } from 'src/app/Front-End/core/services/alerts.service';
import { JobPostService } from 'src/app/Front-End/core/services/job-post.service';

@Component({
  selector: 'app-job-post-edit-form',
  templateUrl: './job-post-edit-form.component.html',
  styleUrls: ['./job-post-edit-form.component.css']
})
export class RecruiterEditJobPageComponent  implements OnInit {
  @Input() job!: JobPost;
  isLoading:boolean=false;
  jobPostForm!: FormGroup;
  isEditMode: boolean = false;
  errorMessage: string = '';
  isJobActive: boolean = true;
  jobPostId!: string;

  constructor(
    private jobPostService: JobPostService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private alert:AlertService // FormBuilder for initializing form
  ) {}


  ngOnInit(): void {

    this.activatedRouter.paramMap.subscribe((param: Params) => {
      this.jobPostId = param['get']('id');
    });

    this.jobPostService.getJobPostById(this.jobPostId).subscribe(
      (jobData: JobPost) => {
        this.job = jobData;
        console.log('Job data:', this.job); // Debugging the fetched data
        if (this.job) {
          this.initializeForm();
        } else {
          console.error('Job data not found');
        }
      },
      (error) => {
        console.error('Failed to fetch job post:', error);
        this.errorMessage = 'Failed to load job post data';
      }
    );
  }
  
  initializeForm(): void {

    if (this.job) {
    this.jobPostForm = this.fb.group({
      _id: [this.job._id],
      jobId:  [this.job.jobId],
      jobRoleTitle:  [this.job.jobRoleTitle],
      jobType:  [this.job.jobType],
      jobLevel:  [this.job.jobLevel],
  
      category:  [this.job.category],
      skills:  [this.job.skills],
      proficiency:  [this.job.proficiency],
      language:  [this.job.language],
  
      salary:  [this.job.salary],
      experience:  [this.job.experience],
      location:  [this.job.location],
      vacancy:  [this.job.vacancy],
  
      benefits:  [this.job.jobId],
      applyByDate: [new Date(this.job?.applyByDate).toISOString().slice(0, 10)],
  
      jobDescription: [this.job.jobDescription]

    });

    // Disable form controls initially, if needed
    if (!this.isEditMode) {
        this.jobPostForm.disable();
    }
  }
}


  goBack(){
    this.router.navigateByUrl(`talent-page/recruiter/manage-jobs`);
  }
  

  openEditMode(): void {
    if (this.isJobActive) {
      this.isEditMode = true;
      this.jobPostForm.enable();
    } else {
      this.errorMessage = 'Job post is closed, unable to edit.';
      this.jobPostForm.disable();
    }
  }
  

  discardChanges(): void {
    // Reset the form back to the original job data
    this.jobPostForm.reset({
      _id: this.job._id,
      jobId:  this.job.jobId,
      jobRoleTitle:  this.job.jobRoleTitle,
      jobType:  this.job.jobType,
      jobLevel:  this.job.jobLevel,
      category:  this.job.category,
      skills:  this.job.skills,
      proficiency:  this.job.proficiency,
      language:  this.job.language,
      salary:  this.job.salary,
      experience:  this.job.experience,
      location:  this.job.location,
      vacancy:  this.job.vacancy,
      benefits:  this.job.jobId,
      applyByDate: new Date(this.job?.applyByDate).toISOString().slice(0, 10),
      jobDescription: this.job.jobDescription
    });
  
    // Disable the form to prevent further editing
    this.jobPostForm.disable();
  
    // Reset edit mode flag
    this.isEditMode = false;
  }
  
  updateJobPost(): void {
    if (this.jobPostForm.valid) {
      const updatedJob = {
        ...this.jobPostForm.value,
        jobDescription: this.jobPostForm.value.jobDescription,
        applyByDate: new Date(this.jobPostForm.value.applyByDate)
      };

      this.isLoading = true; // Start loading indicator if necessary
      this.jobPostService.updateJobPostById(updatedJob._id, updatedJob).subscribe(
        () => {
          // On success, delay navigation and show success alert
          setTimeout(() => {
            this.isEditMode = false;
            this.isLoading = false; // Stop loading indicator
            this.alert.showJobUpdatedSuccess(); // Show success alert
            this.router.navigateByUrl(`talent-page/recruiter/manage-jobs`);
          }, 3000);
        },
        (error) => {
          console.error(error);
          this.isLoading = false; // Stop loading indicator in case of error
          this.errorMessage = 'Failed to update job post';
          console.log(updatedJob.jobDescription); 
          console.error('Failed to fetch job post:', error);
    this.errorMessage = 'Failed to load job post data';
    console.log(this.jobPostForm.valid); // To check if the form is valid
    console.log(this.jobPostForm.errors); // To see specific form errors
        }
      );
    } else {
      this.errorMessage = 'All fields are required.';
    }
  }
  
}
