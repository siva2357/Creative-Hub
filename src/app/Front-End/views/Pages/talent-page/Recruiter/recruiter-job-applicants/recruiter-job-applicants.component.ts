import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobPost, JobResponse } from 'src/app/Front-End/core/models/jobPost.model';
import { AuthService } from 'src/app/Front-End/core/services/auth.service';
import { JobPostService } from 'src/app/Front-End/core/services/jobPost.service';

@Component({
  selector: 'app-recruiter-job-applicants',
  templateUrl: './recruiter-job-applicants.component.html',
  styleUrls: ['./recruiter-job-applicants.component.css']
})
export class RecruiterJobApplicantsPageComponent implements OnInit {
  public jobs: JobPost[] = [];
  public errorMessage: string | null = null;
  public totalJobs!: number;

  recruiterId!: string;

  constructor(
    private jobService: JobPostService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.recruiterId = localStorage.getItem('userId') || '';

    // If recruiterId is missing, redirect to login or show error message
    if (!this.recruiterId) {
      this.errorMessage = 'Recruiter ID is missing. Please log in again.';
      this.router.navigate(['/login']);
    } else {
      this.fetchJobs();
    }
  }

  get hasJobPosts(): boolean {
    return this.jobs.length > 0;
  }

  // Fetch job posts and applicants for the recruiter
  fetchJobs(): void {
    this.jobService.getRecruiterJobApplicants(this.recruiterId).subscribe(
      (response: JobResponse) => {
        // Store total count of jobs and job posts
        this.totalJobs = response.totalJobPosts;
        this.jobs = response.jobPosts; // Assign the job posts directly
      },
      (error) => {
        console.error('Error fetching job posts:', error);
        this.errorMessage = error.message || 'Failed to load job posts. Please try again later.';
      }
    );
  }

  // Navigate to view applicants for a specific job post
  viewApplicants(jobPost: JobPost): void {
    if (!jobPost || !jobPost._id) {
      console.error('Job post ID is missing or invalid');
      return;
    }
    this.router.navigate([`/talent-page/recruiter/jobpost/${jobPost._id}/applicants`]);
  }
}
