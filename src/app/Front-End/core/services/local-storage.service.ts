import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, LoginResponse } from '../models/auth.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_DATA_KEY = 'user_data';
  private readonly SESSION_EXPIRY_KEY = 'session_expiry';
  private readonly SESSION_DURATION = 3600000; // Example 1 hour session duration

  public isAuthenticated: boolean = false;
  private authToken: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  // Call the login endpoint
  login(credentials: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/login', credentials);
  }

  // This method sets the user session based on login response
  private setUserSession(user: LoginResponse): void {
    if (user.token) {
      const data = {
        role: user.role,           // Role of the user (e.g., seeker, recruiter, admin)
        username: user.username,   // Username if available
        email: user.email,         // Email of the user
        token: user.token,         // Token for authentication
        userId: user.userId,       // User ID for reference (if returned)
        profilePicture: user.profilePicture, // Profile picture, if available
      };

      // Set the token and user data in storage
      this.authToken = user.token;
      this.setStorageItem(this.TOKEN_KEY, user.token);
      this.setStorageItem(this.USER_DATA_KEY, JSON.stringify(data));

      // Set session expiry
      this.setSessionExpiry();

      // Mark the user as authenticated
      this.isAuthenticated = true;
    } else {
      console.error('User token is undefined');
      this.isAuthenticated = false;
    }
  }

  // Store items in both localStorage and sessionStorage
  private setStorageItem(key: string, value: string): void {
    localStorage.setItem(key, value);
    sessionStorage.setItem(key, value);
  }

  // Set session expiry (e.g., 1 hour)
  private setSessionExpiry(): void {
    const expiryTime = new Date().getTime() + this.SESSION_DURATION;
    sessionStorage.setItem(this.SESSION_EXPIRY_KEY, expiryTime.toString());
  }

  // Check if session has expired and log out if needed
  private checkSessionExpiry(): void {
    const expiryTime = sessionStorage.getItem(this.SESSION_EXPIRY_KEY);
    if (expiryTime) {
      const currentTime = new Date().getTime();
      if (currentTime >= +expiryTime) {
        this.logout();
      }
    }
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    this.checkSessionExpiry();
    this.authToken = this.getToken();
    return !!this.authToken;
  }

  // Get the authentication token from storage
  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY) || localStorage.getItem(this.TOKEN_KEY);
  }

  // Logout and clear session
  logout(): void {
    this.removeStorageItem(this.TOKEN_KEY);
    this.removeStorageItem(this.USER_DATA_KEY);
    sessionStorage.removeItem(this.SESSION_EXPIRY_KEY);
    sessionStorage.clear();
    this.isAuthenticated = false;
    this.authToken = null;
    this.router.navigate(['/login']);
  }

  // Remove storage items
  private removeStorageItem(key: string): void {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  }
}
