import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Front-End/core/services/auth.service';

@Component({
  selector: 'app-talent-header',
  templateUrl: './talent-header.component.html',
  styleUrls: ['./talent-header.component.css']
})
export class TalentHeaderComponent implements OnInit{

  userName: string | null = null;// Variable to hold the username
  userRole: string | null = null;// Variable to hold the username
  userProfileImage: string |  null = null;// URL for the user's profile image

  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
    this.userName = this.authService.getUserName();
    this.userRole = this.authService.getRole(); // Get role if needed
    this.userProfileImage = this.authService.getUserProfile(); // Repla
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/talent-page/login']);
  }

  goToProfile()  {
    this.router.navigate(['/talent-page/recruiter/mainpage']);
  }

  goToEditProfile(){
    this.router.navigate(['/talent-page/recruiter/edit-profile']);
  }

}
