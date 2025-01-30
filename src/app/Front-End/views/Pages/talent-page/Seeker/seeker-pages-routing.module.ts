import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeekerMainPageComponent } from './seeker-main-page.component';
import { SeekerPortfolioComponent } from './seeker-portfolio/seeker-portfolio.component';
import { SeekerDashboardComponent } from './seeker-dashboard/seeker-dashboard.component';
import { SeekerJobProfileComponent } from './seeker-jobProfile/seeker-jobProfile.component';
import { SeekerLaunchpadComponent } from './seeker-launchPad/seeker-launchPad.component';
import { SeekerPostProjectPageComponent } from './seeker-post-project/seeker-post-project.component';
import { SeekerManageProjectPageComponent } from './seeker-manage-project/seeker-manage-project.component';
import { SeekerProfilePageComponent } from './seeker-profile/seeker-profile-page.component';

const routes: Routes = [
	// Default path for recruiter redirects to 'recruiter/dashboard'
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },

	{
	  path: '', component:  SeekerMainPageComponent, // Main layout component with sidebar
	  children: [
		{ path: 'dashboard', component: SeekerDashboardComponent }, // Profile page route
		{ path: 'profile', loadChildren: () => import('./seeker-profile/seeker-profile.module').then((m) => m. SeekerProfileModule)},
		{ path: 'post-project', component: SeekerPostProjectPageComponent }, // Profile page route
		{ path: 'manage-project', component: SeekerManageProjectPageComponent }, // Profile page route
		{ path: 'portfolio', component: SeekerPortfolioComponent }, // Profile page route
		{ path: 'jobProfile', component: SeekerJobProfileComponent }, // Profile page route
		{ path: 'launchPad', component: SeekerLaunchpadComponent }, // Profile page route
	  ]
	}
  ];


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SeekerPagesRoutingModule { }
