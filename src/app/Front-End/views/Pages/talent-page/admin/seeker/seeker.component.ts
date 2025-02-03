import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seeker',
  templateUrl: './seeker.component.html',
  styleUrls: ['./seeker.component.css']
})
export class SeekerComponent {

     constructor(private router: Router) { }

     goToSeekerDetails(): void {
          this.router.navigateByUrl('talent-page/admin/seeker-details/:id');
        }


}
