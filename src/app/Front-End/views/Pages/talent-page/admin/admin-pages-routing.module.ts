import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUserDataPageComponent } from './admin-user-data/admin-user-data.component';
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


const routes: Routes = [
	// Default path for recruiter redirects to 'recruiter/dashboard'
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },

	{
	  path: '', component: AdminPageComponent, // Main layout component with sidebar
	  children: [
		{ path: 'dashboard', component: AdminDashboardComponent }, // Dashboard route
		{ path: 'user-data', component: AdminUserDataPageComponent } ,// Hire Seeker page route
    { path: 'university', component: UniversityComponent } ,// Hire Seeker page route
		{ path: 'company', component: CompanyComponent } ,// Hire Seeker page route
    { path: 'university-details/:id', component: UniversityDetailsComponent } ,// Hire Seeker page route
		{ path: 'company-details/:id', component: CompanyDetailsComponent } ,// Hire Seeker page route
    { path: 'recruiter', component: RecruiterComponent } ,// Hire Seeker page route
		{ path: 'seeker', component: SeekerComponent} ,// Hire Seeker page route
    { path: 'recruiter-details/:id', component: RecruiterDetailsComponent } ,// Hire Seeker page route
		{ path: 'seeker-details/:id', component: SeekerDetailsComponent } ,// Hire Seeker page route
    { path: 'user-location', component: UserLocationComponent } ,// Hire Seeker page route
    { path: 'university-company-location', component: UniversityCompanyLocationComponent } ,// Hire Seeker page route

	  ]
	}
  ];



@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminPagesRoutingModule { }
