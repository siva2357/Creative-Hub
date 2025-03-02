import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {jwtDecode} from 'jwt-decode' ;
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JobPost } from '../models/jobPost.model';

@Injectable({
  providedIn: 'root'
})
export class JobPostService {

  private baseUrl: string = 'http://localhost:3000/api';
  jobList: JobPost[] = [];

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('JWT_Token');

    if (!token) {
      console.error("🚨 No token found in localStorage!");
      return new HttpHeaders(); // Empty headers to avoid undefined errors
    }

    // Debugging: Decode and check token expiration
    try {
      const decodedToken: any = jwtDecode(token);
      console.log('Decoded Token:', decodedToken);
      console.log('Expiration Date:', new Date(decodedToken.exp * 1000));  // `exp` is in seconds
    } catch (error) {
      console.error("🚨 Token decoding failed:", error);
    }

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`, // ✅ Correct token format
      'Content-Type': 'application/json'
    });
  }



  constructor(private http: HttpClient) { }

  // Create a new job post
  createJobPost(jobPostData: JobPost): Observable<JobPost> {
    return this.http.post<JobPost>(`${this.baseUrl}/recruiter/jobPost`, jobPostData, { headers: this.getHeaders() }).pipe(catchError(this.handleError));
  }

    // Fetch all job posts for recruiter
    getJobsByRecruiter(recruiterId:string,): Observable<{totalJobPosts: number;  jobPosts: JobPost[]}> {
      return this.http.get<{totalJobPosts: number;  jobPosts: JobPost[] }>(`${this.baseUrl}/recruiter/${recruiterId}/jobPosts`, { headers: this.getHeaders() }).pipe(catchError(this.handleError));
    }

    // Fetch job post by ID for recruiter
  getRecruiterJobPostById(recruiterId:string, jobId: string): Observable<JobPost> {
    return this.http.get<JobPost>(`${this.baseUrl}/recruiter/${recruiterId}/jobPost/${jobId}`, { headers: this.getHeaders() }).pipe(catchError(this.handleError));
  }

  getClosedJobsByRecruiter(recruiterId:string,): Observable<{totalJobPosts: number;  jobPosts: JobPost[]}> {
    return this.http.get<{totalJobPosts: number;  jobPosts: JobPost[] }>(`${this.baseUrl}/recruiter/${recruiterId}/jobPosts/closed`, { headers: this.getHeaders() }).pipe(catchError(this.handleError));
  }

  // Update job post by ID for recruiter
  updateJobPostById(recruiterId:string,jobId: string, jobPostData: JobPost): Observable<JobPost> {
    return this.http.put<JobPost>(`${this.baseUrl}/recruiter/${recruiterId}/jobPost/${jobId}/update`, jobPostData, { headers: this.getHeaders() }).pipe(catchError(this.handleError));
  }

  // Delete job post by ID for recruiter
  deleteJobPostById(recruiterId:string,jobId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/recruiter/${recruiterId}/jobPost/${jobId}/delete`, { headers: this.getHeaders() }).pipe(catchError(this.handleError));
  }

  // Close job post (Recruiter specific)
  closeJobPostById(recruiterId:string, jobId: string,jobPostData: JobPost): Observable<JobPost> {
    return this.http.put<JobPost>(`${this.baseUrl}/recruiter/${recruiterId}/jobPost/${jobId}/close`, jobPostData, { headers: this.getHeaders() }).pipe(catchError(this.handleError));
  }

    // Close job post (Recruiter specific)
  reopenJobPostById(recruiterId:string,jobId: string, jobPostData: JobPost): Observable<JobPost> {
    return this.http.put<JobPost>(`${this.baseUrl}/recruiter/${recruiterId}/jobPost/${jobId}/reopen`, jobPostData,  { headers: this.getHeaders() }).pipe(catchError(this.handleError));
  }

  // Fetch all job posts for recruiter
  getAllJobPosts(): Observable<JobPost[]> {
    return this.http.get<JobPost[]>(`${this.baseUrl}/jobPosts`, { headers: this.getHeaders() }).pipe(catchError(this.handleError));
  }

  // Fetch job post by ID for recruiter
  getJobPostById(jobId: string): Observable<JobPost> {
    return this.http.get<JobPost>(`${this.baseUrl}/jobPosts/${jobId}`, { headers: this.getHeaders() }).pipe(catchError(this.handleError));
  }



  // Fetch all job posts for recruiter
  getJobApplicants(recruiterId:string,jobPostId: string): Observable<any> {
    return this.http.get<JobPost[]>(`${this.baseUrl}/recruiter/${recruiterId}/jobpost/${jobPostId}/applicants`, { headers: this.getHeaders() }).pipe(catchError(this.handleError));
  }


  getRecruiterJobApplicants(recruiterId:string): Observable<{totalJobPosts: number;  jobPosts: JobPost[], totalApplicants:number}> {
    return this.http.get<{totalJobPosts: number; totalApplicants: number; jobPosts: JobPost[] }>(`${this.baseUrl}/recruiter/${recruiterId}/jobPosts/Applicants`, { headers: this.getHeaders() }).pipe(catchError(this.handleError));
  }
















  applyJobPostById(id: string, jobPostData: JobPost): Observable<JobPost> {
    return this.http.put<JobPost>(`${this.baseUrl}/job/${id}/apply`, jobPostData, { headers: this.getHeaders() }).pipe(catchError(this.handleError));
  }

  // Fetch applied job posts (Seeker specific)
  getAppliedJobPosts(): Observable<JobPost[]> {
    return this.http.get<JobPost[]>(`${this.baseUrl}/jobs/applied`, { headers: this.getHeaders() }).pipe(catchError(this.handleError));
  }


  // Withdraw job application (Seeker specific)
  withdrawJobPostById(id: string, jobPostData: JobPost): Observable<JobPost> {
    return this.http.put<JobPost>(`${this.baseUrl}/job/${id}/withdraw`,jobPostData, { headers: this.getHeaders() }).pipe(catchError(this.handleError));
  }


 saveJobPostById(id: string, jobPostData: JobPost): Observable<JobPost> {
    return this.http.put<JobPost>(`${this.baseUrl}/job/${id}/save`, jobPostData, { headers: this.getHeaders() }).pipe(catchError(this.handleError));
  }

  // Fetch applied job posts (Seeker specific)
  getSavedJobPosts(): Observable<JobPost[]> {
    return this.http.get<JobPost[]>(`${this.baseUrl}/jobs/saved`, { headers: this.getHeaders() }).pipe(catchError(this.handleError));
  }


  // Withdraw job application (Seeker specific)
  unsaveJobPostById(id: string, jobPostData: JobPost): Observable<JobPost> {
    return this.http.put<JobPost>(`${this.baseUrl}/job/${id}/unsave`,jobPostData, { headers: this.getHeaders() }).pipe(catchError(this.handleError));
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
