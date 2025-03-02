import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobPost, JobResponse } from 'src/app/Front-End/core/models/jobPost.model';
import { AuthService } from 'src/app/Front-End/core/services/auth.service';
import { JobPostService } from 'src/app/Front-End/core/services/jobPost.service';
@Component({
  selector: 'app-recruiter-manage-job',
  templateUrl: './recruiter-manage-job.component.html',
  styleUrls: ['./recruiter-manage-job.component.css']
})
export class RecruiterManageJobPageComponent implements OnInit {

  recruiterId!: string;
  jobId!: string;
  public jobs: JobPost[] = [];
  public errorMessage: string | null = null;
  public totalJobs!:any

  constructor(private jobService: JobPostService,private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.recruiterId = localStorage.getItem('userId') || '';

    console.log("User ID:", this.recruiterId);

    if (this.recruiterId) {
      this.fetchJobs();
    } else {
      this.errorMessage = 'Recruiter ID is missing. Please log in again.';
    }
  }

  get hasJobPosts(): boolean {
    return this.jobs.length > 0;
  }

  fetchJobs() {
    this.jobService.getJobsByRecruiter(this.recruiterId).subscribe(
      (response: JobResponse) => {
        // Handle successful response
        this.totalJobs = response.totalJobPosts; // Store total count
        this.jobs = response.jobPosts; // Directly assign the jobPosts array
      },
      (error) => {
        // Handle error response
        console.error('Error fetching job posts:', error);
        this.errorMessage = error.message || 'Failed to load job posts. Please try again later.';
      }
    );
  }


    goToJobpostEdit(jobPost:JobPost): void {
      if (!jobPost || !jobPost._id) {
        console.error('Jobpost ID is missing or invalid');
        return;
      }
      this.router.navigateByUrl(`talent-page/recruiter/view-jobPost/${jobPost._id}`);
    }


    closeJobpostById(jobPostData: JobPost) {
      if (!jobPostData._id || !this.recruiterId) {
        console.error("Job ID or Recruiter ID is missing or invalid.");
        return;
      }

      const confirmClose = confirm("Are you sure you want to close this job post?");
      if (!confirmClose) return;

      // Store original jobs for rollback in case of failure
      const originalJobs = [...this.jobs];

      // Optimistically update the job list UI
      this.jobs = this.jobs.map(job =>
        job._id === jobPostData._id ? { ...job, jobPostDetails: { ...job.jobPostDetails, status: "Closed" } } : job
      );

      this.jobService.closeJobPostById(this.recruiterId, jobPostData._id, jobPostData).subscribe(
        () => {
          console.log("Job closed successfully!");

          // ✅ Fetch updated jobs immediately after closing
          this.fetchJobs();
        },
        (error) => {
          console.error("Error closing job:", error);
          alert("Failed to close the job. Please try again.");

          // Rollback to original state on failure
          this.jobs = originalJobs;
        }
      );
    }



}
