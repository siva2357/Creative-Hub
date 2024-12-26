import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { RecruiterProfilePageComponent } from './recruiter-profile-page.component';
import { RecruiterProfessionalDetailsComponent } from './recruiter-professional-details/recruiter-professional-details.component';
import { RecruiterBasicDetailsComponent } from './recruiter-basic-details/recruiter-basic-details.component';
import { RecruiterSkillsPageComponent } from './recruiter-skills-page/recruiter-skills-page.component';
import { RecruiterCertificationPageComponent } from './recruiter-certification-page/recruiter-certification-page.component';
import { RecruiterResumePageComponent } from './recruiter-resume-page/recruiter-resume-page.component';


const routes: Routes = [
	{ path: '', component: RecruiterProfilePageComponent,
	  children: [
		{ path: '', redirectTo: 'basic', pathMatch: 'full' },
		{ path: 'basic', component: RecruiterBasicDetailsComponent },
		{ path: 'profession', component: RecruiterProfessionalDetailsComponent },
		{ path: 'skills', component:  RecruiterSkillsPageComponent },
		{ path: 'certifications', component: RecruiterCertificationPageComponent },
		{ path: 'resume', component: RecruiterResumePageComponent },
	  ]
	}
  ];
  
  
  


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RecruiterProfileRoutingModule { }
