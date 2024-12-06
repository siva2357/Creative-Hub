import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css']
})
export class RegistrationConfirmationComponent {


  constructor( private router: Router) {}

  login() {
    this.router.navigate(['talent-page/talent-login']); // Corrected navigation
  }
}
