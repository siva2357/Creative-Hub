import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeekerBasicDetailsComponent } from './seeker-basic-details/seeker-basic-details.component';
import { SeekerEducationDetailsComponent } from './seeker-education-details/seeker-education-details.component';
import { SeekerProfilePageComponent } from './seeker-profile-page.component';
import { SeekerSkillsPageComponent } from './seeker-skills-page/seeker-skills-page.component';
import { SeekerCertificationPageComponent } from './seeker-certification-page/seeker-certification-page.component';
import { SeekerProjectPageComponent } from './seeker-project-page/seeker-project-page.component';
import { SeekerResumePageComponent } from './seeker-resume-page/seeker-resume-page.component';


const routes: Routes = [
	{
	  path: '',
	  component: SeekerProfilePageComponent,
	  children: [
		{ path: '', redirectTo: 'basic', pathMatch: 'full' },
		{ path: 'basic', component: SeekerBasicDetailsComponent },
		{ path: 'education', component: SeekerEducationDetailsComponent },
		{ path: 'skills', component: SeekerSkillsPageComponent },
		{ path: 'certifications', component: SeekerCertificationPageComponent },
		{ path: 'projects', component: SeekerProjectPageComponent },
		{ path: 'resume', component: SeekerResumePageComponent },
	  ]
	}
  ];
  
  
  


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SeekerProfileRoutingModule { }
