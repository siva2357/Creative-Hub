import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recruiter-calender',
  templateUrl: './recruiter-calender.component.html',
  styleUrls: ['./recruiter-calender.component.css']
})
export class RecruiterCalenderComponent {
  constructor(private router: Router ) {}

  goBack() {
    this.router.navigate(['talent-page/seeker/mainpage']);
  }
  

}
