import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, switchMap, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Login, LoginResponse } from '../models/auth.model';
import { Recruiter, Seeker } from '../models/user-registration.model';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { BrowserStorageConstant } from '../constants/browser-storage.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'http://localhost:3000'; // Backend server URL
  private userRole: string | null = null;
  private currentUser: LoginResponse | null = null;

  constructor(private http: HttpClient, private router: Router, private localStorageService: LocalStorageService,) { }

  // Register recruiter
  registerRecruiter(recruiterData: Recruiter): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/register/recruiter`, recruiterData)
      .pipe(
        tap(response => this.handleSuccess(response)),
        catchError(error => this.handleError(error))
      );
  }

  // Get recruiter by ID
  getRecruiterById(id: string): Observable<Recruiter> {
    return this.http.get<Recruiter>(`${this.baseUrl}/api/recruiter/${id}`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // Update recruiter
  updateRecruiter(id: string, recruiterData: Recruiter): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/recruiter/${id}`, recruiterData).pipe(
      tap(response => this.showSuccess('Recruiter updated successfully')),
      catchError(error => this.handleError(error))
    );
  }

  // Delete recruiter
  deleteRecruiter(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/recruiter/${id}`).pipe(
      tap(response => this.showSuccess('Recruiter deleted successfully')),
      catchError(error => this.handleError(error))
    );
  }

// CRUD Operations for Seeker
  // Register seeker
  registerSeeker(seekerData: Seeker): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/register/seeker`, seekerData)
      .pipe(
        tap(response => this.handleSuccess(response)),
        catchError(error => this.handleError(error))
      );
  }

  // Get seeker by ID
  getSeekerById(id: string): Observable<Seeker> {
    return this.http.get<Seeker>(`${this.baseUrl}/api/seeker/${id}`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // Update seeker
  updateSeeker(id: string, seekerData: Seeker): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/seeker/${id}`, seekerData).pipe(
      tap(response => this.showSuccess('Seeker updated successfully')),
      catchError(error => this.handleError(error))
    );
  }

  // Delete seeker
  deleteSeeker(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/seeker/${id}`).pipe(
      tap(response => this.showSuccess('Seeker deleted successfully')),
      catchError(error => this.handleError(error))
    );
  }

  login(loginData: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/api/login/user`, loginData)
      .pipe(
        tap(response => {
          console.log('Login response:', response);  // Log the response to inspect
          if (response && response.role) {

            this.setUserData(response);
            this.showSuccess('Login successful!');
          } else {
            this.showError('Invalid login response');
          }
        }),
        catchError(error => {
          this.handleError(error);
          return throwError(() => new Error(error));
        })
      );
  }


  // Store login and role info locally
  public setUserData(user: LoginResponse) {
    this.currentUser = user; // Store user in memory
    localStorage.setItem('userData', JSON.stringify(user));
    localStorage.setItem('userRole', JSON.stringify(user.role));
  }

  public getUserRole(): string | null {
    const userRole = localStorage.getItem('userRole');
    return userRole ? JSON.parse(userRole) : null;
  }


  public getCurrentUser(): LoginResponse | null {
    return this.currentUser;
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
    return user?.profile?.url || null; // Assuming the backend returns 'profile' with 'url'
  }




  // Remove this method if not used
getUserDetails(): Observable<Seeker | Recruiter | null> {
  const userData = localStorage.getItem('userData');
  if (!userData) {
    console.error('User data not found in localStorage');
    return throwError(() => new Error('User data not found in localStorage'));
  }
  const user = JSON.parse(userData);
  const userId = user?.id;
  const role = user?.role;

  if (!userId || !role) {
    console.error('User ID or Role not found in localStorage');
    return throwError(() => new Error('User ID or Role not found in localStorage'));
  }
  // Use the appropriate method based on role
  if (role === 'seeker') {
    return this.getSeekerById(userId);
  } else if (role === 'recruiter') {
    return this.getRecruiterById(userId);
  } else {
    return throwError(() => new Error('Invalid user role'));
  }
}






  logout() {
    localStorage.removeItem('userData');
    localStorage.removeItem('userRole');
    this.userRole = null;
  }

  // Handle success response
  private handleSuccess(response: any) {
    if (response.status === 'success') {
      this.showSuccess(response.message);  // Show success message using SweetAlert
    }
  }

  // Handle error response
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    let errorMessage = error.error?.message || 'An error occurred, please try again.';
    this.showError(errorMessage);  // Show error message using SweetAlert
    return throwError(() => new Error(error));
  }

  // Show Success Notification
  private showSuccess(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message,
      showConfirmButton: true
    });
  }

  // Show Error Notification
  private showError(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      showConfirmButton: true
    });
  }

    // Check if the username is available
    checkUsernameAvailability(username: string): Observable<boolean> {
      return this.http.get<boolean>(`${this.baseUrl}/api/check-username/${username}`)
        .pipe(
          catchError(error => this.handleError(error))
        );
    }


    checkEmailAvailability(email: string): Observable<boolean> {
      return this.http.get<boolean>(`${this.baseUrl}/api/check-email/${email}`)
        .pipe(
          catchError(error => this.handleError(error))
        );
    }

  registerSeekerWithCheck(seekerData: Seeker): Observable<any> {
    // First check if username and email are available
    return this.checkUsernameAvailability(seekerData.registrationDetails.userName).pipe(
      switchMap(isUsernameAvailable => {
        if (!isUsernameAvailable) {
          throw new Error('Username already exists.');
        }
        return this.checkEmailAvailability(seekerData.registrationDetails.email);  // Check email availability
      }),
      switchMap(isEmailAvailable => {
        if (!isEmailAvailable) {
          throw new Error('Email already exists.');
        }
        return this.http.post(`${this.baseUrl}/api/register/seeker`, seekerData);  // Proceed with registration
      }),
      catchError(error => this.handleError(error)) // Handle error
    );
  }

  registerRecruiterWithCheck(recruiterData: Recruiter): Observable<any> {
    // First check if username and email are available
    return this.checkUsernameAvailability(recruiterData.registrationDetails.userName).pipe(
      switchMap(isUsernameAvailable => {
        if (!isUsernameAvailable) {
          throw new Error('Username already exists.');
        }
        return this.checkEmailAvailability(recruiterData.registrationDetails.email);  // Check email availability
      }),
      switchMap(isEmailAvailable => {
        if (!isEmailAvailable) {
          throw new Error('Email already exists.');
        }
        return this.http.post(`${this.baseUrl}/api/register/recruiter`, recruiterData);  // Proceed with registration
      }),
      catchError(error => this.handleError(error)) // Handle error
    );
  }





}
