import { Component } from '@angular/core';
import { JobPost } from 'src/app/Front-End/core/models/jobPost.model';
import { JobPostService } from 'src/app/Front-End/core/services/job-post.service';

@Component({
  selector: 'app-recruiter-manage-job',
  templateUrl: './recruiter-manage-job.component.html',
  styleUrls: ['./recruiter-manage-job.component.css']
})
export class RecruiterManageJobPageComponent {
  public jobs: JobPost[] = [];

  public errorMessage: string | null = null;

  constructor(private jobService: JobPostService) {
    this.fetchJobs();
  }

  get hasJobPosts(): boolean {
    return this.jobs.length > 0;
  }


  fetchJobs() {
    this.jobService.getAllJobPosts().subscribe(
      (data: JobPost[]) => {
        this.jobs = data;
      },
      (error) => {
        console.error('Error fetching job posts:', error);
        this.errorMessage = 'Failed to load job posts. Please try again later.';
      }
    );
  }


  onJobClosed(jobId: string) {
    this.jobs = this.jobs.filter((job) => job._id !== jobId);
  }
  
}
