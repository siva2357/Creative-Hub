import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recruiter-project-page',
  templateUrl: './recruiter-project-page.component.html',
  styleUrls: ['./recruiter-project-page.component.css']
})
export class RecruiterProjectPageComponent {

  constructor( private router:Router){}

  projectUpload(){
    this.router.navigateByUrl('talent-page/seeker/post-project')
  }

}
