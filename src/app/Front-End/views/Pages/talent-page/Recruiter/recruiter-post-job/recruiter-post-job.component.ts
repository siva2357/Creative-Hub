import { Component, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DEFAULT_TOOLBAR, Editor, Toolbar } from 'ngx-editor';
import { Company } from 'src/app/Front-End/core/models/company.model';
import { JobPost } from 'src/app/Front-End/core/models/jobPost.model';
import { Recruiter } from 'src/app/Front-End/core/models/user.model';
import { AdminService } from 'src/app/Front-End/core/services/admin.service';
import { AuthService } from 'src/app/Front-End/core/services/auth.service';
import { JobPostService } from 'src/app/Front-End/core/services/jobPost.service';
import { ProfileService } from 'src/app/Front-End/core/services/profile-service';
import { UserService } from 'src/app/Front-End/core/services/user-service';

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
  recruiterId!: string;
  companyId!: string;
  public editor!: Editor;
  toolbar: Toolbar = DEFAULT_TOOLBAR;
  public recruiter!: Recruiter;
  userId!: string;
  loading: boolean = true;  // For managing loading state

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private jobService: JobPostService,
    private profileService: ProfileService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Get the userId and role from localStorage or AuthService
    this.recruiterId = localStorage.getItem('userId') || this.authService.getUserId() || '';
    const role = localStorage.getItem('userRole') || this.authService.getRole() || '';

    console.log("User ID:", this.recruiterId);
    console.log("User Role:", role); // Log the user role for debugging

    if (this.recruiterId && role) {
      this.getRecruiterDetails();
    } else {
      this.errorMessage = 'User ID or Role is not available.';
    }

    this.initializeForm();
    this.fetchCompanies();
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  getRecruiterDetails() {
    // Using recruiterId here instead of userId
    this.userService.getRecruiterById(this.recruiterId).subscribe(
      (data: any) => {
        console.log('Recruiter Details:', data);
        this.recruiter = data;
        this.loading = false;
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  fetchCompanies() {
    this.adminService.getAllCompanies().subscribe(
      (response: { companies: Company[] }) => {
        // Assign the actual companies to the `companies` array
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
      status: ['active']
    });
  }

  submitJobPost() {
    if (this.jobPostForm.valid) {
      this.isSubmitting = true; // Disable submit button
      const jobPostData: JobPost = {
        recruiterId: this.recruiterId,
        companyId: this.companyId, // Make sure to assign the companyId
        ...this.jobPostForm.value,
        status: this.jobPostForm.value.status || 'active'
      };
      this.isLoading = true;
      this.jobService.createJobPost(jobPostData).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.isLoading = false;
          this.jobPostForm.reset({
            salary: '',
            jobType:'',
          });
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
