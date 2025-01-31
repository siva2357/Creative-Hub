import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})
export class UniversityComponent {

       constructor(private router: Router) { }

       goToUniversityDetails(): void {
            this.router.navigateByUrl('talent-page/admin/university-details/:id');
          }

}
