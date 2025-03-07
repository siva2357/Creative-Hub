import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Front-End/core/services/auth.service';
import { UserService } from 'src/app/Front-End/core/services/user-service';
import { Recruiter, Seeker } from 'src/app/Front-End/core/models/user.model';


@Component({
  selector: 'app-talent-header',
  templateUrl: './talent-header.component.html',
  styleUrls: ['./talent-header.component.css']
})
export class TalentHeaderComponent implements OnInit {

  public userDetails! :Recruiter | Seeker;
  public userName!: Recruiter | Seeker;

  userId!: string;
  public errorMessage: string | null = null;
  loading: boolean = true;  // For managing loading state



  @Input() sidebarOpen: boolean = true; // Receives sidebar state
  @Output() toggleSidebar = new EventEmitter<void>(); // Emits toggle event

  toggle() {
    this.sidebarOpen = !this.sidebarOpen;
    this.toggleSidebar.emit(); // Emit event to parent to toggle sidebar
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Get the userId and role from localStorage or AuthService
    this.userId = localStorage.getItem('userId') || this.authService.getUserId() || '';
    const role = localStorage.getItem('userRole') || this.authService.getRole() || '';

    console.log("User ID:", this.userId);
    console.log("User Role:", role); // Log the user role for debugging

    if (this.userId && role) {
      if (role === 'seeker') {
        this.getSeekerDetails();
      } else if (role === 'recruiter') {
        this.getRecruiterDetails();
      } else if (role === 'admin') {
        this.getAdminDetails();
      }else {
        this.errorMessage = 'Invalid role.';
      }
    } else {
      this.errorMessage = 'User ID or Role is not available.';
    }
  }


  getAdminDetails() {
    this.userService.getAdminById(this.userId).subscribe(
      (data: any) => {
        console.log('Admin Details:', data);
        this.userDetails = data;
        this.userName = data.registrationDetails.userName;

        this.loading = false;
      },
      (error) => {
        this.handleError(error);
      }
    );
}

getSeekerDetails() {
    this.userService.getSeekerById(this.userId).subscribe(
      (data: any) => {
        console.log('Seeker Details:', data);
        this.userDetails = data;
        this.userName = data.registrationDetails.userName;
        this.loading = false;
      },
      (error) => {
        this.handleError(error);
      }
    );
}

getRecruiterDetails() {
    this.userService.getRecruiterById(this.userId).subscribe(
      (data: any) => {
        console.log('Recruiter Details:', data);
        this.userDetails = data;
        this.userName = data.registrationDetails.userName;

        this.loading = false;
      },
      (error) => {
        this.handleError(error);
      }
    );
}

handleError(error: any) {
    console.error('Error fetching user details:', error);
    if (error.status === 401) {
      this.errorMessage = 'Unauthorized access. Please log in again.';
    } else {
      this.errorMessage = 'An error occurred while fetching user details.';
    }
    this.loading = false;
}


  // Navigate to the change password page
  goToChangePasswordPage(): void {
    if (!this.userDetails || !this.userDetails._id) { // Assuming email is unique
      console.error('User details are missing or invalid');
      return;
    }
    this.router.navigate([`talent-page/change-password/${this.userDetails._id}`]); // Redirect to change-password page
  }

  goToAccountSettingsPage(): void {
    if (!this.userDetails || !this.userDetails._id) { // Assuming email is unique
      console.error('User details are missing or invalid');
      return;
    }
    this.router.navigate([`talent-page/account-settings/${this.userDetails._id}`]); // Redirect to change-password page
  }

  // Perform logout
  onLogout(): void {
    this.authService.logout(); // Call logout function from AuthService
    this.router.navigate(['talent-page/login']); // Redirect to login page after logout
  }

}
