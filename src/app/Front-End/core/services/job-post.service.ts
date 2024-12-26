import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JobPost } from '../models/jobPost.model';

@Injectable({
  providedIn: 'root'
})
export class JobPostService {
  private jobPostApiUrl = 'http://localhost:3000/api/job-posts';
  jobList: JobPost[] = [];

  constructor(private http: HttpClient) { }

  // Create a new job post
  createJobPost(jobPostData: JobPost): Observable<JobPost> {
    return this.http.post<JobPost>(`${this.jobPostApiUrl}/job`, jobPostData).pipe(catchError(this.handleError));
  }

  // Fetch all job posts for recruiter
  getAllJobPosts(): Observable<JobPost[]> {
    return this.http.get<JobPost[]>(`${this.jobPostApiUrl}/jobs`).pipe(catchError(this.handleError));
  }

  // Fetch job post by ID for recruiter
  getJobPostById(id: string): Observable<JobPost> {
    return this.http.get<JobPost>(`${this.jobPostApiUrl}/job/${id}`).pipe(catchError(this.handleError));
  }

  // Update job post by ID for recruiter
  updateJobPostById(id: string, jobPostData: JobPost): Observable<JobPost> {
    return this.http.put<JobPost>(`${this.jobPostApiUrl}/job/${id}`, jobPostData).pipe(catchError(this.handleError));
  }

  // Delete job post by ID for recruiter
  deleteJobPostById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.jobPostApiUrl}/job/${id}/delete`).pipe(catchError(this.handleError));
  }


  // Close job post (Recruiter specific)
  closeJobPostById(id: string, jobPostData: JobPost): Observable<JobPost> {
    return this.http.put<JobPost>(`${this.jobPostApiUrl}/job/${id}/close`, jobPostData).pipe(catchError(this.handleError));
  }

  // Reopen job post (Recruiter specific)
  reopenJobPostById(id: string, jobPostData: JobPost): Observable<JobPost> {
    return this.http.put<JobPost>(`${this.jobPostApiUrl}/job/${id}/reopen`, jobPostData).pipe(catchError(this.handleError));
  }

  // Fetch closed job posts (Recruiter specific)
  getClosedJobPosts(): Observable<JobPost[]> {
    return this.http.get<JobPost[]>(`${this.jobPostApiUrl}/jobs/closed`).pipe(catchError(this.handleError));
  }


  applyJobPostById(id: string, jobPostData: JobPost): Observable<JobPost> {
    return this.http.put<JobPost>(`${this.jobPostApiUrl}/job/${id}/apply`, jobPostData).pipe(catchError(this.handleError));
  }

  // Fetch applied job posts (Seeker specific)
  getAppliedJobPosts(): Observable<JobPost[]> {
    return this.http.get<JobPost[]>(`${this.jobPostApiUrl}/jobs/applied`).pipe(catchError(this.handleError));
  }

  
  // Withdraw job application (Seeker specific)
  withdrawJobPostById(id: string, jobPostData: JobPost): Observable<JobPost> {
    return this.http.put<JobPost>(`${this.jobPostApiUrl}/job/${id}/withdraw`,jobPostData).pipe(catchError(this.handleError));
  }


  // Handle HTTP errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}


