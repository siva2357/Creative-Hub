

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs'; 
import { Login, LoginResponse } from '../models/auth.model';
import { Recruiter, Seeker } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'http://localhost:4600'; // Backend server URL
  private userRole: string | null = null;

  constructor(private http: HttpClient) { }

  // Register recruiter
  registerRecruiter(recruiterData: Recruiter): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/register/recruiter`, recruiterData)
      .pipe(catchError(error => this.handleError(error)));
  }

  // Register seeker
  registerSeeker(seekerData: Seeker): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/register/seeker`, seekerData)
      .pipe(catchError(error => this.handleError(error)));
  }

  // Login for both recruiters and seekers
  login(loginData: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/api/login/user`, loginData) // Explicitly use LoginResponse
      .pipe(
        tap(response => {
          if (response && response.role) { // Check if response contains a role
            this.setUserData(response);    // Save user data, including role
          } else {
            throw new Error('Invalid login response');
          }
        }),
        catchError(error => {
          // Show alert only if login fails
          window.alert('Invalid credentials');
          return throwError(() => new Error(error));
        })
      );
  }

  // Store login and role info locally
  private setUserData(user: LoginResponse) {
    localStorage.setItem('userData', JSON.stringify(user)); // Store user data in localStorage
  }

  getRole(): string | null {
    const user = JSON.parse(localStorage.getItem('userData') || '{}');
    return user?.role || null;
  }

  setUserRole(role: string) {
    this.userRole = role;
    localStorage.setItem('userRole', role);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userData');
  }

  getUserName(): string | null {
    const user = JSON.parse(localStorage.getItem('userData') || '{}');
    return user?.username || null; // Assuming the backend returns 'username'
  }

  getUserProfile(): string | null {
    const user = JSON.parse(localStorage.getItem('userData') || '{}');
    return user?.profile || null; // Assuming the backend returns 'profile'
  }

  logout() {
    localStorage.removeItem('userData');
    localStorage.removeItem('userRole'); // Clear userRole from localStorage
    this.userRole = null; // Clear userRole in the service
  }

  // Error handling method
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}

