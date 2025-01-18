import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seeker-dashboard',
  templateUrl: './seeker-dashboard.component.html',
  styleUrls: ['./seeker-dashboard.component.css']
})
export class SeekerDashboardComponent {
  constructor(private router: Router ) {}

  goToJobApplications(){
    this.router.navigate(['talent-page/seeker/jobProfile']);

  }
  
  goToProjectUploadPage(){
    this.router.navigate(['talent-page/seeker/post-project']);

  }

}
