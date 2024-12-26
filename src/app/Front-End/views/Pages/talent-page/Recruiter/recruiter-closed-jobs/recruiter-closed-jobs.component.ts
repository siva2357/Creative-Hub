import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobPost } from 'src/app/Front-End/core/models/jobPost.model';
import { JobPostService } from 'src/app/Front-End/core/services/job-post.service';

@Component({
  selector: 'app-recruiter-closed-jobs',
  templateUrl: './recruiter-closed-jobs.component.html',
  styleUrls: ['./recruiter-closed-jobs.component.css']
})
export class RecruiterClosedJobsPageComponent {

  jobs: JobPost[] = [];
  loading: boolean = true;
  errorMessage!: string;

  constructor(private jobService: JobPostService, private route: ActivatedRoute) {
    this.fetchJobs();
  }

  get hasJobPosts(): boolean {
    return this.jobs.length > 0;
  }

  fetchJobs() {
    this.loading = true;
    this.jobService.getClosedJobPosts().subscribe(
      (data) => {
        this.jobs = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching job posts:', error);
        this.loading = false;
        this.errorMessage = 'Failed to load job posts. Please try again later.';
      }
    );
  }


  onJobReopened(id: string) {
    this.jobs = this.jobs.filter(job => job._id !== id);
  }

  
  // Handle job deletion event
  onJobDeleted(id: string) {
    this.jobs = this.jobs.filter(job => job._id !== id);
  }




}
