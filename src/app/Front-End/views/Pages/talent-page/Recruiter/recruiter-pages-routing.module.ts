import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecruiterMainPageComponent } from './recruiter-main-page.component';
import { RecruiterHireSeekerPageComponent } from './recruiter-hire-seeker/recruiter-hire-seeker.component';
import { RecruiterDashboardComponent } from './recruiter-dashboard/recruiter-dashboard.component';
import { RecruiterPostJobPageComponent } from './recruiter-post-job/recruiter-post-job.component';
import { RecruiterManageJobPageComponent } from './recruiter-manage-job/recruiter-manage-job.component';
import { RecruiterClosedJobsPageComponent } from './recruiter-closed-jobs/recruiter-closed-jobs.component';
import { RecruiterJobApplicantsPageComponent } from './recruiter-job-applicants/recruiter-job-applicants.component';
import { RecruiterEditJobPageComponent } from './recruiter-edit-job/job-post-edit-form.component';
import { RecruiterSeekerProfileComponent } from './recruiter-seeker-profile/recruiter-seeker-profile.component';
import { RecruiterEditProfileComponent } from './recruiter-edit-profile/recruiter-edit-profile.component';



const routes: Routes = [
	// Default path for recruiter redirects to 'recruiter/dashboard'
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },

	{
	  path: '', component: RecruiterMainPageComponent, // Main layout component with sidebar
	  children: [
		{ path: 'dashboard', component: RecruiterDashboardComponent, title: 'Recruiter dashboard page'  }, // Dashboard route
		{ path: 'profile', loadChildren: () => import('./recruiter-profile/recruiter-profile.module').then((m) => m. RecruiterProfileModule)},
		{ path: 'post-job', component: RecruiterPostJobPageComponent, title: 'Post Jobpost Page'  } ,// Hire Seeker page route
		{ path: 'manage-jobs', component: RecruiterManageJobPageComponent, title: 'Manage Jobpost Page'  } ,// Hire Seeker page route
		{ path: 'view-jobPost/:id', component:  RecruiterEditJobPageComponent,  title: 'View Jobpost Page'  },
		{ path: 'closed-jobs', component: RecruiterClosedJobsPageComponent,  title: 'Closed Jobs Page'  } ,// Hire Seeker page route
		{ path: 'job-applicants', component: RecruiterJobApplicantsPageComponent, title: 'Job Applicants Page'  } ,// Hire Seeker page route
		{ path: 'hire-seeker', component: RecruiterHireSeekerPageComponent, title: 'Hire Seeker Page'  }, // Hire Seeker page route
        { path:'seeker-profile/:id', component: RecruiterSeekerProfileComponent, title: 'Seeker Profile Page' },
        { path: 'edit-profile/:id', component: RecruiterEditProfileComponent, title: 'Recruiter Edit Profile Page' },

	  ]
	}
  ];



@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RecruiterPagesRoutingModule { }
