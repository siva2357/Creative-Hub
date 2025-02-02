import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AdminPageComponent } from './admin-page.component';
import { AdminPagesRoutingModule } from './admin-pages-routing.module';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUserDataPageComponent } from './admin-user-data/admin-user-data.component';
import { LayoutModule } from "../../../Layouts/layout.module";
import { UniversityComponent } from './university/university.component';
import { UniversityDetailsComponent } from './university-details/university-details.component';
import { CompanyComponent } from './company/company.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { RecruiterComponent } from './recruiter/recruiter.component';
import { SeekerComponent } from './seeker/seeker.component';
import { RecruiterDetailsComponent } from './recruiter-details/recruiter-details.component';
import { SeekerDetailsComponent } from './seeker-details/seeker-details.component';
import { UserLocationComponent } from './user-location/user-location.component';
import { UniversityCompanyLocationComponent } from 'src/app/Front-End/views/Pages/talent-page/admin/university-company-location/university-company-location.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    AdminDashboardComponent,
    AdminUserDataPageComponent,
    UniversityComponent,
    UniversityDetailsComponent,
    CompanyComponent,
    CompanyDetailsComponent,
    RecruiterComponent,
    SeekerComponent,
    RecruiterDetailsComponent,
    SeekerDetailsComponent,
    UserLocationComponent,
    UniversityCompanyLocationComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AdminPagesRoutingModule,
    LayoutModule
],
  providers: [DatePipe],

})
export class AdminPageModule { }
