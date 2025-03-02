import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecruiterProfile } from 'src/app/Front-End/core/models/profile-details.model';
import { AuthService } from 'src/app/Front-End/core/services/auth.service';
import { ProfileService } from 'src/app/Front-End/core/services/profile-service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-recruiter-basic-details',
  templateUrl: './recruiter-basic-details.component.html',
  styleUrls: ['./recruiter-basic-details.component.css']
})
export class RecruiterBasicDetailsComponent {
  isSocialMedia:boolean = false;
    recruiterId!: string;

    public profileDetails! :RecruiterProfile;
    errorMessage: string = '';

        constructor(private router: Router,private authService: AuthService,
            private profileService:ProfileService, private sanitizer: DomSanitizer) { }

      ngOnInit() {
        // Get the userId and role from localStorage or AuthService
        this.recruiterId = localStorage.getItem('userId') || this.authService.getUserId() || '';
        const role = localStorage.getItem('userRole') || this.authService.getRole() || '';

        console.log("User ID:", this.recruiterId);
        console.log("User Role:", role); // Log the user role for debugging

        if (this.recruiterId && role) {
            this.loadRecruiterProfile();
          }else {
            this.errorMessage = 'User ID or Role is not available.';
          }

        }


        loadRecruiterProfile() {
    this.profileService.getRecruiterProfileById(this.recruiterId).subscribe(
      (response: RecruiterProfile) => {
        if (response) {
          // Ensure bioDetails is inside profileDetails
          this.profileDetails = {
            ...response,
            profileDetails: {
              ...response.profileDetails,
              bioDetails: {
                ...response.profileDetails.bioDetails,
                sanitizedBioDescription: this.sanitizeHtml(response.profileDetails.bioDetails.bioDescription || '')
              }
            }
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

}
