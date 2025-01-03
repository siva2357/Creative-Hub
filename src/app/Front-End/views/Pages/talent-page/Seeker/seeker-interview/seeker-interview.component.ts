import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seeker-interview',
  templateUrl: './seeker-interview.component.html',
  styleUrls: ['./seeker-interview.component.css']
})
export class SeekerInterviewComponent {
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