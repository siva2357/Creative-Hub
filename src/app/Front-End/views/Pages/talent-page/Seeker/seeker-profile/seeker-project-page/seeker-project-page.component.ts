import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seeker-project-page',
  templateUrl: './seeker-project-page.component.html',
  styleUrls: ['./seeker-project-page.component.css']
})
export class SeekerProjectPageComponent {

  constructor( private router:Router){}

  projectUpload(){
    this.router.navigateByUrl('talent-page/seeker/post-project')
  }

}
