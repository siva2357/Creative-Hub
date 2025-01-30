import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Recruiter, Seeker } from 'src/app/Front-End/core/models/user-registration.model';
import { AuthService } from 'src/app/Front-End/core/services/auth.service';

@Component({
  selector: 'app-talent-header',
  templateUrl: './talent-header.component.html',
  styleUrls: ['./talent-header.component.css']
})
export class TalentHeaderComponent implements OnInit {

  userProfileImage: string | null = null; // URL for the user's profile image
  public userDetails!: any; // This will hold the user details


  @Output() userDetailsEmitter = new EventEmitter<Seeker | Recruiter>();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('userData');

    if (!userData) {
      console.error('User not logged in. Redirecting to login...');
      this.router.navigate(['talent-page/login']); // Redirect if no user data
      return;
    }

    this.loadUserProfile();
  }

  private hasValidExtension(url: string, validExtensions: string[]): boolean {
    const ext = url.split('?')[0].toLowerCase();
    const extension = ext.split('.').pop() || '';
    return validExtensions.includes(extension);
  }

  isImage(url: string): boolean {
    return this.hasValidExtension(url, ['jpg', 'jpeg', 'png', 'gif', 'webp']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/talent-page/login']);
  }


  loadUserProfile(): void {
    this.authService.getUserDetails().subscribe({
      next: (userDetails: any) => {
        if (userDetails) {
          this.userDetails = userDetails;
          this.userDetailsEmitter.emit(this.userDetails); // Emit the user details to the parent component
        } else {
          console.error('User details not found.');
        }
      },
      error: (error) => {
        console.error('Error fetching user details:', error);
      }
    });
  }

}
