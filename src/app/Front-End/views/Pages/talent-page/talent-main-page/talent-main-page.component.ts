import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-talent-main-page',
  templateUrl: './talent-main-page.component.html',
  styleUrls: ['./talent-main-page.component.css']
})
export class TalentMainPageComponent {

    constructor(private router: Router) {}

  login() {
    this.router.navigate(['talent-page/login']); // Corrected navigation
  }

  signUp() {
    this.router.navigate(['talent-page/signup']); // Corrected navigation
  }

}
