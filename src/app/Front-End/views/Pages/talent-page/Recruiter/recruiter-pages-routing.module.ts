import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecruiterMainPageComponent } from './recruiter-main-page.component';
import { RecruiterHireSeekerPageComponent } from './recruiter-hire-seeker/recruiter-hire-seeker.component';
import { RecruiterProfilePageComponent } from './recruiter-profile/recruiter-profile-page.component';
import { RecruiterDashboardComponent } from './recruiter-dashboard/recruiter-dashboard.component';
import { RecruiterPostJobPageComponent } from './recruiter-post-job/recruiter-post-job.component';
import { RecruiterManageJobPageComponent } from './recruiter-manage-job/recruiter-manage-job.component';
import { RecruiterClosedJobsPageComponent } from './recruiter-closed-jobs/recruiter-closed-jobs.component';
import { RecruiterJobApplicantsPageComponent } from './recruiter-job-applicants/recruiter-job-applicants.component';
import { RecruiterEditJobPageComponent } from './recruiter-edit-job/job-post-edit-form.component';


const routes: Routes = [
	// Default path for recruiter redirects to 'recruiter/dashboard'
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  
	{
	  path: '', component: RecruiterMainPageComponent, // Main layout component with sidebar
	  children: [
		{ path: 'dashboard', component: RecruiterDashboardComponent }, // Dashboard route
		{ path: 'profile', loadChildren: () => import('./recruiter-profile/recruiter-profile.module').then((m) => m. RecruiterProfileModule)},
		{ path: 'post-job', component: RecruiterPostJobPageComponent } ,// Hire Seeker page route
		{ path: 'manage-jobs', component: RecruiterManageJobPageComponent } ,// Hire Seeker page route
		{ path: 'view-jobPost/:id', component:  RecruiterEditJobPageComponent },		
		{ path: 'closed-jobs', component: RecruiterClosedJobsPageComponent } ,// Hire Seeker page route
		{ path: 'job-applicants', component: RecruiterJobApplicantsPageComponent } ,// Hire Seeker page route
		{ path: 'hire-seeker', component: RecruiterHireSeekerPageComponent } // Hire Seeker page route

	  ]
	}
  ];



@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RecruiterPagesRoutingModule { }
