import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recruiter-schedule-interview',
  templateUrl: './recruiter-schedule-interview.component.html',
  styleUrls: ['./recruiter-schedule-interview.component.css']
})
export class RecruiterScheduleInterviewComponent {
  constructor(private router: Router ) {}

 
  goToCalenderPage() {
    this.router.navigate(['talent-page/recruiter/interview/calender-page']);
  }

  goToMeetingPage() {
    this.router.navigate(['talent-page/recruiter/interview/meeting-page']);
  }
  
  goToUploadPage() {
    this.router.navigate(['talent-page/seeker/upload-section']);
  }
  

}
