import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobPost, JobResponse } from 'src/app/Front-End/core/models/jobPost.model';
import { JobPostService } from 'src/app/Front-End/core/services/jobPost.service';
@Component({
  selector: 'app-recruiter-closed-jobs',
  templateUrl: './recruiter-closed-jobs.component.html',
  styleUrls: ['./recruiter-closed-jobs.component.css']
})

export class RecruiterClosedJobsPageComponent implements OnInit {

  recruiterId!: string;
  public jobs: JobPost[] = [];
  public errorMessage: string | null = null;
  public totalJobs!:any

  constructor(private jobService: JobPostService,private router: Router) {}

  ngOnInit() {
    this.recruiterId = localStorage.getItem('userId') || '';
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
    this.jobService.getClosedJobsByRecruiter(this.recruiterId).subscribe(
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


  reopenJobpostById(jobPostData: JobPost) {
    if (!jobPostData._id || !this.recruiterId) {
      console.error("Job ID or Recruiter ID is missing or invalid.");
      return;
    }

    const confirmReopen = confirm("Are you sure you want to reopen this job post?");
    if (!confirmReopen ) return;

    // Store original jobs for rollback in case of failure
    const originalJobs = [...this.jobs];

    // Optimistically update the job list UI
    this.jobs = this.jobs.map(job =>
      job._id === jobPostData._id ? { ...job, jobPostDetails: { ...job.jobPostDetails, status: "Closed" } } : job
    );

    this.jobService.reopenJobPostById(this.recruiterId, jobPostData._id, jobPostData).subscribe(
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


  deleteJobpostById(jobPostData: JobPost) {
    if (!jobPostData._id || !this.recruiterId) {
      console.error("Job ID or Recruiter ID is missing or invalid.");
      return;
    }

    const confirmDelete = confirm("Are you sure you want to delete this job post?");
    if (!confirmDelete) return;

    // Store original jobs for rollback in case of failure
    const originalJobs = [...this.jobs];

    // Optimistically update the job list UI
    this.jobs = this.jobs.map(job =>
      job._id === jobPostData._id ? { ...job, jobPostDetails: { ...job.jobPostDetails, status: "Closed" } } : job
    );

    this.jobService.deleteJobPostById(this.recruiterId, jobPostData._id).subscribe(
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
