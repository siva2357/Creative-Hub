import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  constructor(private router: Router) {}

  goToUniversityPage(): void {
    this.router.navigateByUrl('talent-page/admin/university');
  }

  goToCompanyPage(): void {
    this.router.navigateByUrl('talent-page/admin/company');
  }

}
