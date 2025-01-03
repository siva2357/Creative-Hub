import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recruiter-schedule-interview',
  templateUrl: './recruiter-schedule-interview.component.html',
  styleUrls: ['./recruiter-schedule-interview.component.css']
})
export class RecruiterScheduleInterviewComponent {
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
