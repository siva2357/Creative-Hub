import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { RecruiterProfile } from 'src/app/Front-End/core/models/profile-details.model';
import { ProfileBar } from 'src/app/Front-End/core/models/sidebar-menu.model';
import { AuthService } from 'src/app/Front-End/core/services/auth.service';
import { ProfileService } from 'src/app/Front-End/core/services/profile-service';
@Component({
  selector: 'app-recruiter-profile-page',
  templateUrl: './recruiter-profile-page.component.html',
  styleUrls: ['./recruiter-profile-page.component.css']
})
export class RecruiterProfilePageComponent {
  recruiterId!: string;

  public profileDetails! :RecruiterProfile;
  errorMessage: string = '';

    constructor(private router: Router,private authService: AuthService,
        private profileService:ProfileService) { }
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
            (data:RecruiterProfile) => {
              console.log('Recruiter profile details:', data);
              if (data) {
                this.profileDetails = data;
              } else {
                this.errorMessage = 'No profile data found';
              }
            },
            (error) => {
              console.error('Error fetching profile data', error);
              this.errorMessage = 'Error fetching profile details.';
            }
          );
        }




    editProfile(): void {
      this.router.navigateByUrl(`talent-page/recruiter/edit-profile/${this.recruiterId}`);
    }
}
