import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/Front-End/core/models/sidebar-menu.model';
import { Recruiter, Seeker } from 'src/app/Front-End/core/models/user.model';
import { AuthService } from 'src/app/Front-End/core/services/auth.service';
import { UserService } from 'src/app/Front-End/core/services/user-service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent {


    userId!: string;
    public errorMessage: string | null = null;
    loading: boolean = true;  // For managing loading state
    public userDetails :any;

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
        } else {
          this.errorMessage = 'Invalid role.';
        }
      } else {
        this.errorMessage = 'User ID or Role is not available.';
      }
    }



getSeekerDetails() {
  this.userService.getSeekerById(this.userId).subscribe(
    (data: any) => {
      console.log('Seeker Details:', data);
      this.userDetails = data;
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

      this.loading = false;
    },
    (error) => {
      this.handleError(error);
    }
  );
}


deleteAccount() {
  const confirmation = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");

  if (confirmation) {
    let deleteObservable;

    if (this.userDetails.role === 'seeker') {
      deleteObservable = this.userService.deleteSeekerById(this.userId);
    } else if (this.userDetails.role === 'recruiter') {
      deleteObservable = this.userService.deleteRecruiterById(this.userId);
    } else {
      alert("Invalid user role. Cannot delete.");
      return;
    }

    deleteObservable.subscribe(
      () => {
        alert("Account deleted successfully.");

        // **Clear user session & stored data**
        localStorage.clear();
        sessionStorage.clear();

        // **Redirect to login page**
        this.router.navigate(['talent-page/login']);
      },
      (error) => {
        console.error("Error deleting account:", error);
        alert("Failed to delete account. Please try again.");
      }
    );
  }
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



}
