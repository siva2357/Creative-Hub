import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recruiter-meeting',
  templateUrl: './recruiter-meeting.component.html',
  styleUrls: ['./recruiter-meeting.component.css']
})
export class RecruiterMeetingComponent {
  constructor(private router: Router ) {}

  goBack() {
    this.router.navigate(['talent-page/seeker/mainpage']);
  }
  

}
