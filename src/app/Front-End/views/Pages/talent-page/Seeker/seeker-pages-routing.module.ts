import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeekerMainPageComponent } from './seeker-main-page.component';
import { SeekerPortfolioComponent } from './seeker-portfolio/seeker-portfolio.component';
import { SeekerDashboardComponent } from './seeker-dashboard/seeker-dashboard.component';
import { SeekerJobProfileComponent } from './seeker-jobProfile/seeker-jobProfile.component';
import { SeekerLaunchpadComponent } from './seeker-launchPad/seeker-launchPad.component';
import { SeekerPostProjectPageComponent } from './seeker-post-project/seeker-post-project.component';
import { SeekerManageProjectPageComponent } from './seeker-manage-project/seeker-manage-project.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SeekerEditProfileComponent } from './seeker-edit-profile/seeker-edit-profile.component';
const routes: Routes = [
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
	{
	  path: '', component:  SeekerMainPageComponent, // Main layout component with sidebar
	  children: [
		{ path: 'dashboard', component: SeekerDashboardComponent }, // Profile page route
		{ path: 'profile', loadChildren: () => import('./seeker-profile/seeker-profile.module').then((m) => m. SeekerProfileModule)},
		{ path: 'post-project', component: SeekerPostProjectPageComponent, title: 'Seeker post project Page'   }, // Profile page route
		{ path: 'manage-project', component: SeekerManageProjectPageComponent,  title: 'Seeker manage project Page'   }, // Profile page route
		{ path: 'portfolio', component: SeekerPortfolioComponent,  title: 'Seeker portfolio Page'   }, // Profile page route
		{ path: 'jobProfile', component: SeekerJobProfileComponent,  title: 'Seeker Job Profile Page'   }, // Profile page route
		{ path: 'launchPad', component: SeekerLaunchpadComponent , title: 'Seeker LaunchPad Page'  }, // Profile page route
        { path: 'project-details/:id', component: ProjectDetailsComponent,  title: 'Seeker Project details Page'   }, // Profile page route
        {path:  'edit-profile/:id', component: SeekerEditProfileComponent, title: 'Seeker Edit Profile Page' },
	  ]
	}
  ];


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SeekerPagesRoutingModule { }
