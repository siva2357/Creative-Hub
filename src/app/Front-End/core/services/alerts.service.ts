// src/app/Front-End/core/services/alerts.service.ts
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  // Signup Details Alerts
  showSignupAllDetailsAlert(): void {
    Swal.fire({
      title: 'Error',
      text: 'Please enter all details.',
      icon: 'error',
      confirmButtonColor: '#d9534f'
    });
  }

  showSignupFullNameAlert(): void {
    Swal.fire({
      title: 'Error',
      text: 'Full name is required.',
      icon: 'error',
      confirmButtonColor: '#d9534f'
    });
  }

  showSignupSurnameAlert(): void {
    Swal.fire({
      title: 'Error',
      text: 'Surname is required.',
      icon: 'error',
      confirmButtonColor: '#d9534f'
    });
  }

  showSignupEmailAlert(): void {
    Swal.fire({
      title: 'Error',
      text: 'Email is required.',
      icon: 'error',
      confirmButtonColor: '#d9534f'
    });
  }

  showSignupValidEmailAlert(): void {
    Swal.fire({
      title: 'Error',
      text: 'Please enter a valid email address.',
      icon: 'error',
      confirmButtonColor: '#d9534f'
    });
  }

  showSignupPasswordAlert(): void {
    Swal.fire({
      title: 'Error',
      text: 'Password is required.',
      icon: 'error',
      confirmButtonColor: '#d9534f'
    });
  }

  showSignupPasswordMatchAlert(): void {
    Swal.fire({
      title: 'Error',
      text: 'Passwords don\'t match.',
      icon: 'error',
      confirmButtonColor: '#d9534f'
    });
  }

  // Profile Details Alerts
  showProfileImageAlert(): void {
    Swal.fire({
      title: 'Error',
      text: 'Please upload a profile image.',
      icon: 'error',
      confirmButtonColor: '#d9534f'
    });
  }

  showProfileImageFormatAlert(): void {
    Swal.fire({
      title: 'Error',
      text: 'Only JPEG, PNG, JPG formats are required.',
      icon: 'error',
      confirmButtonColor: '#d9534f'
    });
  }

  // OTP Verification Alerts
  showOtpVerificationAlert(): void {
    Swal.fire({
      title: 'Error',
      text: 'Please enter OTP for verification.',
      icon: 'error',
      confirmButtonColor: '#d9534f'
    });
  }

  // OTP Invalid Alerts
  showOtpInvalidAlert(): void {
    Swal.fire({
      title: 'Error',
      text: 'Invalid OTP. You have 2 attempt(s) left.',
      icon: 'error',
      confirmButtonColor: '#d9534f'
    });
  }

  // Success Messages
  showAccountRegisteredSuccess(): void {
    Swal.fire({
      title: 'Success',
      text: 'Account details registered successfully.',
      icon: 'success',
      confirmButtonColor: '#5bc0de'
    });
  }

  // Success Messages
  showErrorRegisteringAccount(): void {
    Swal.fire({
      title: 'Error',
      text: 'Error registering details please try again later ',
      icon: 'error',
      confirmButtonColor: '#5bc0de'
    });
  }



  showOtpVerifiedSuccess(): void {
    Swal.fire({
      title: 'Success',
      text: 'OTP verified successfully.',
      icon: 'success',
      confirmButtonColor: '#5bc0de'
    });
  }

  showAccountVerifiedSuccess(): void {
    Swal.fire({
      title: 'Success',
      text: 'Account verified.',
      icon: 'success',
      confirmButtonColor: '#5bc0de'
    });
  }

  showWelcomeSuccess(): void {
    Swal.fire({
      title: 'Success',
      text: 'Welcome to your account.',
      icon: 'success',
      confirmButtonColor: '#5bc0de'
    });
  }

  showLoginSuccess(): void {
    Swal.fire({
      title: 'Success',
      text: 'Login successfully.',
      icon: 'success',
      confirmButtonColor: '#5bc0de'
    });
  }




  success(message: string) {
    Swal.fire({
      icon: 'success',
      title: message,
      confirmButtonColor: '#5bc0de'
    });
  }

  error(message: string) {
    Swal.fire({
      icon: 'error',
      title: message,
      confirmButtonColor: '#5bc0de'
    });
    
  }

  warning(message: string) {
    Swal.fire({
      icon: 'warning',
      title: message,
    });
  }



}
