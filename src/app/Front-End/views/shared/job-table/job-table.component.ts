import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { JobPost } from 'src/app/Front-End/core/models/jobPost.model';
import { AlertService } from 'src/app/Front-End/core/services/alerts.service';
import { JobPostService } from 'src/app/Front-End/core/services/job-post.service';

@Component({
  selector: 'app-job-table',
  templateUrl: './job-table.component.html',
  styleUrls: ['./job-table.component.css'],
})
export class JobTableComponent {
  @Input() jobs: JobPost[] = []; 
  @Output() jobClosed = new EventEmitter<string>(); // Emit job id when closed
  @Output() jobUpdated = new EventEmitter<JobPost>();
  @Output() jobDeleted = new EventEmitter<string>();
  @Output() jobReopen = new EventEmitter<string>();
  @Output() jobPosted = new EventEmitter<JobPost>();
  showJobPostForm: boolean = false;

  selectedJob!:JobPost
  constructor(private router: Router, private jobService: JobPostService, private alert:AlertService) { }
  selectedJobs: JobPost[] = [];
  isViewMode: boolean = true; 

  
  onJobPostUpdated(updatedJobPost: JobPost) {
    const index = this.jobs.findIndex(job => job._id === updatedJobPost._id);
    if (index !== -1) {
      this.jobs[index] = updatedJobPost;
    }
  }

  
  // Navigate to view job details page only if job status is active
  viewDetails(job: JobPost) {
    if (!job || !job._id) {
      console.error('Job ID is missing or invalid');
      return;
    }
      this.router.navigateByUrl(`talent-page/recruiter/view-jobPost/${job._id}`)
  }
  

  async confirmClose(job: JobPost) {
    if (!job || !job._id) {
      console.error('Job data is not available');
      return;
    }
    try {
      const userConfirmed = await this.alert.showJobConfirmClose(); 
      if (userConfirmed) {
        this.jobService.closeJobPostById(job._id, job).subscribe(
          () => {
            this.jobClosed.emit(job._id);
            this.alert.showJobClosedSuccess(); 
          },
          (error) => {
            this.handleError(error, 'close job post');
          }
        );
      }
    } catch (error) {
      console.error('Error during job close confirmation:', error);
    }
  }
  
  async confirmDelete(job: JobPost) {
    if (!job || !job._id) {
      console.error('Job data is not available');
      return;
    }
    try {
      const userConfirmed = await this.alert.showJobConfirmDelete(); 
      if (userConfirmed) {
        this.jobService.deleteJobPostById(job._id).subscribe(
          () => {
            this.jobDeleted.emit(job._id);
            this.alert.showJobDeletedSuccess(); 
          },
          (error) => {
            this.handleError(error, 'delete job post');
          }
        );
      }
    } catch (error) {
      console.error('Error during job delete confirmation:', error);
    }
  }

  async confirmReopen(job: JobPost) {
    if (!job || !job._id) {
      console.error('Job data is not available');
      return;
    }
    try {
      const userConfirmed = await this.alert.showJobConfirmReopen(); 
      if (userConfirmed) {
        this.jobService.reopenJobPostById(job._id,job).subscribe(
          () => {
            this.jobDeleted.emit(job._id);
            this.alert.showJobReopenedSuccess(); 
          },
          (error) => {
            this.handleError(error, 'reopen job post');
          }
        );
      }
    } catch (error) {
      console.error('Error during job delete confirmation:', error);
    }
  }


  
  private handleError(error: any, action: string) {
    console.error(`Error ${action}:`, error);
    alert(`Failed to ${action}. Please try again later.`);
  }

}




