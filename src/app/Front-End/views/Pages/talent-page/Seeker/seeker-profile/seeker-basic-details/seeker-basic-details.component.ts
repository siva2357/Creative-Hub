import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SeekerProfile } from 'src/app/Front-End/core/models/profile-details.model';
import { AuthService } from 'src/app/Front-End/core/services/auth.service';
import { ProfileService } from 'src/app/Front-End/core/services/profile-service';

@Component({
  selector: 'app-seeker-basic-details',
  templateUrl: './seeker-basic-details.component.html',
  styleUrls: ['./seeker-basic-details.component.css'],
})
export class SeekerBasicDetailsComponent {
  isSocialMedia: boolean = false;
  seekerId!: string;
  socialMediaForm!: FormGroup;
  public profileDetails!: SeekerProfile;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    // Get the userId and role from localStorage or AuthService
    this.seekerId = localStorage.getItem('userId') || '';
    const role = localStorage.getItem('userRole') || '';

    console.log('User ID:', this.seekerId);
    console.log('User Role:', role); // Log the user role for debugging

    if (this.seekerId && role) {
      this.loadSeekerProfile();
      this.initializeForm();
    } else {
      this.errorMessage = 'User ID or Role is not available.';
    }
  }

  loadSeekerProfile() {
    this.profileService.getSeekerProfileById(this.seekerId).subscribe(
      (response: SeekerProfile) => {
        if (response) {
          // Ensure bioDetails is inside profileDetails
          this.profileDetails = {
            ...response,
            profileDetails: {
              ...response.profileDetails,
                sanitizedBioDescription: this.sanitizeHtml(
                  response.profileDetails.bioDescription || ''
                ),

            },
          };
        }
      },
      (error) => {
        console.error('Error fetching profile data', error);
        this.errorMessage = 'Error fetching profile details.';
      }
    );
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  initializeForm() {
    this.socialMediaForm = this.fb.group({
      _id: [null],
      socialMediaProfile: ['', [Validators.required]],
      socialMediaLink: ['', [Validators.required]],
    });
  }

  save() {}
}
