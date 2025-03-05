import { Component} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DEFAULT_TOOLBAR, Editor, Toolbar } from 'ngx-editor';
import { Company } from 'src/app/Front-End/core/models/company.model';
import { JobPost } from 'src/app/Front-End/core/models/jobPost.model';
import { AdminService } from 'src/app/Front-End/core/services/admin.service';
import { JobPostService } from 'src/app/Front-End/core/services/jobPost.service';


@Component({
  selector: 'app-recruiter-post-job',
  templateUrl: './recruiter-post-job.component.html',
  styleUrls: ['./recruiter-post-job.component.css']
})
export class RecruiterPostJobPageComponent {
  public companies: Company[] = [];
  jobPostForm!: FormGroup;
  errorMessage: string = '';
  jobCreated: boolean = false;
  isLoading: boolean = false;
  isSubmitting: boolean = false;
  public editor!: Editor;
  toolbar: Toolbar = DEFAULT_TOOLBAR;
  loading: boolean = true;  // For managing loading state

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private jobService: JobPostService) {}

  ngOnInit() {
    this.initializeForm();
    this.fetchCompanies();
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }


  fetchCompanies() {
    this.adminService.getAllCompanies().subscribe(
      (response: { companies: Company[] }) => {
        this.companies = response.companies;
      },
      (error) => {
        console.error('Error fetching companies:', error);
        this.errorMessage = 'Failed to load companies. Please try again later.';
      }
    );
  }

  initializeForm() {
    this.jobPostForm = this.fb.group({
      _id: [null],
      jobId: ['', [Validators.required]],
      jobRoleTitle: ['', [Validators.required]],
      jobType: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      vacancy: ['', [Validators.required]],
      applyByDate: ['', [Validators.required]],
      jobDescription: ['', [Validators.required]],
      status: ['Open']
    });
  }

  submitJobPost() {
    if (this.jobPostForm.valid) {
      this.isSubmitting = true; // Disable submit button
      const jobPostData: JobPost = {
        jobPostDetails: {
          ...this.jobPostForm.value, // This assumes your form has fields: jobId, jobRoleTitle, jobType, salary, vacancy, applyByDate, jobDescription, etc.
          status: 'Open',
        }
      };
      this.isLoading = true;
      this.jobService.createJobPost(jobPostData).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.isLoading = false;
          this.jobPostForm.reset({ salary: '', jobType:''});
          this.jobCreated = true; // Show success message
          setTimeout(() => {
            this.jobCreated = false; // Hide success message
          }, 3000);
        },
        error: (err) => {
          this.isSubmitting = false;
          this.isLoading = false;
          this.errorMessage = "There was an error while posting the job. Please try again.";
        }
      });
    }
  }

  handleError(error: any) {
    console.error('Error fetching user details:', error);
    if (error.status === 401) {
      this.errorMessage = 'Unauthorized access. Please log in again.';
    } else {
      this.errorMessage = 'An error occurred while fetching user details.';
    }
    this.loading = false;
  }
}
