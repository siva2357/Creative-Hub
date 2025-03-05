import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  JobPost,
  JobResponse,
} from 'src/app/Front-End/core/models/jobPost.model';
import { JobPostService } from 'src/app/Front-End/core/services/jobPost.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-seeker-jobProfile',
  templateUrl: './seeker-jobProfile.component.html',
  styleUrls: ['./seeker-jobProfile.component.css'],
})
export class SeekerJobProfileComponent implements OnInit {
  // Assume JobPost is your interface/model for a job
  jobs: JobPost[] = [];
  appliedJobs: JobPost[] = [];
  selectedJob!: JobPost;
  selectedAppliedJob!: JobPost;

  seekerId: string = ''; // populated from localStorage
  errorMessage: string = '';
  jobId!: string;
  totalJobPosts!: any;

  constructor(
    private router: Router,
    private jobService: JobPostService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.seekerId = localStorage.getItem('userId') || '';

    console.log('User ID:', this.seekerId);

    if (this.seekerId) {
      this.fetchJobPosts();
    } else {
      this.errorMessage = 'Recruiter ID is missing. Please log in again.';
    }
  }

  fetchJobPosts() {
    this.jobService.getAllJobPosts().subscribe(
      (response: JobPost[]) => {
        this.jobs = response.map((jobPost: JobPost) => ({
          ...jobPost,
          jobPostDetails: {
            ...jobPost.jobPostDetails,
            // Sanitize the job description HTML
            sanitizedJobDescription: this.sanitizeHtml(
              jobPost.jobPostDetails.jobDescription
            ),
          },
          // Include recruiter details explicitly
          recruiterId: jobPost.recruiterId
            ? {
                ...jobPost.recruiterId,
                registrationDetails: {
                  ...jobPost.recruiterId.registrationDetails,
                },
              }
            : undefined,
          // Update company details with sanitized description if available
          companyId: jobPost.companyId
            ? {
                ...jobPost.companyId,
                companyDetails: jobPost.companyId.companyDetails
                  ? {
                      ...jobPost.companyId.companyDetails,
                      sanitizedCompanyDescription: this.sanitizeHtml(
                        jobPost.companyId.companyDetails.companyDescription ||
                          ''
                      ),
                    }
                  : undefined,
              }
            : undefined,
        }));
      },
      (error) => {
        console.error('Error fetching job posts:', error);
        this.errorMessage = 'Failed to load job posts. Please try again later.';
      }
    );
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  selectJob(job: JobPost): void {
    this.selectedJob = { ...job };
  }
  selectAppliedJob(job: JobPost): void {
    this.selectedAppliedJob = { ...job };
  }

  applyJob(job: JobPost): void {
    if (!job._id) {
      console.error('Job ID is missing');
      return;
    }
    const jobId: string = job._id;
    const jobData = {
      ...job,
      jobPostDetails: { ...job.jobPostDetails, isApplied: true },
    };

    this.jobService.applyJobPostById(this.seekerId, jobId, jobData).subscribe({
      next: (updatedJob: JobPost) => {
        // Update applied flag on the job
        job.jobPostDetails.isApplied = true;
        if (this.selectedJob && this.selectedJob._id === jobId) {
          this.selectedJob.jobPostDetails.isApplied = true;
        }
      },
      error: (err) => {
        console.error('Error applying for job:', err);
      },
    });
  }

  withdrawJob(job: JobPost): void {
    if (!job._id) {
      console.error('Job ID is missing');
      return;
    }

    const jobId: string = job._id;
    const jobData = {
      ...job,
      jobPostDetails: { ...job.jobPostDetails, isApplied: false },
    };

    this.jobService
      .withdrawJobPostById(this.seekerId, jobId, jobData)
      .subscribe({
        next: (updatedJob: JobPost) => {
          job.jobPostDetails.isApplied = false;
          if (
            this.selectedAppliedJob &&
            this.selectedAppliedJob._id === jobId
          ) {
            this.selectedAppliedJob.jobPostDetails.isApplied = false;
          }
          console.log('Job withdrawn:', job);
        },
        error: (err) => {
          console.error('Error withdrawing job application:', err);
        },
      });
  }

  goBack() {
    this.router.navigate(['talent-page/seeker/mainpage']);
  }

  goToStudentProfile() {
    this.router.navigate(['talent-page/seeker/mainpage']);
  }
  goToEditProfile() {
    this.router.navigate(['talent-page/seeker/edit-profile']);
  }

  goToUploadPage() {
    this.router.navigate(['talent-page/seeker/upload-section']);
  }
}
