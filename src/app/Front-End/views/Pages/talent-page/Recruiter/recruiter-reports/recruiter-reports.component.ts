import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recruiter-reports',
  templateUrl: './recruiter-reports.component.html',
  styleUrls: ['./recruiter-reports.component.css']
})
export class RecruiterReportsComponent {
  constructor(private router: Router ) {}

  goBack() {
    this.router.navigate(['talent-page/seeker/mainpage']);
  }
  
  goToStudentProfile() {
    this.router.navigate(['talent-page/seeker/mainpage']);
  }
  goToEditProfile() {
    this.router.navigate(['talent-page/seeker/edit-profile']);
  }
  
  goToUploadPage() {
    this.router.navigate(['talent-page/seeker/upload-section']);
  }
  

}
