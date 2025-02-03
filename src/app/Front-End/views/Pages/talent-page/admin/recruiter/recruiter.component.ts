import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.css']
})
export class RecruiterComponent {
      constructor(private router: Router) { }

      goToRecruiterDetails(): void {
        this.router.navigateByUrl('talent-page/admin/recruiter-details/:id');
      }

}
