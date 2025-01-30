import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminProfilePageComponent } from './admin-profile/admin-profile-page.component';
import { AdminManageUserPageComponent } from './admin-manage-users/admin-manage-users.component';
import { AdminUserActivityPageComponent } from './admin-user-activity/admin-user-activity.component';
import { AdminUserDataPageComponent } from './admin-user-data/admin-user-data.component';


const routes: Routes = [
	// Default path for recruiter redirects to 'recruiter/dashboard'
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },

	{
	  path: '', component: AdminPageComponent, // Main layout component with sidebar
	  children: [
		{ path: 'dashboard', component: AdminDashboardComponent }, // Dashboard route
		{ path: 'profile', component: AdminProfilePageComponent  }, // Profile page route
		{ path: 'manage-users', component: AdminManageUserPageComponent } ,// Hire Seeker page route
		{ path: 'user-activity', component: AdminUserActivityPageComponent } ,// Hire Seeker page route
		{ path: 'user-data', component: AdminUserDataPageComponent } ,// Hire Seeker page route

	  ]
	}
  ];



@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminPagesRoutingModule { }
