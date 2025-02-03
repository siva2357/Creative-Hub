import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {

         constructor(private router: Router) { }

         goToCompanyDetails(): void {
              this.router.navigateByUrl('talent-page/admin/company-details/:id');
            }

}
