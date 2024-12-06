import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeekerBasicDetailsComponent } from './seeker-basic-details/seeker-basic-details.component';
import { SeekerEducationDetailsComponent } from './seeker-education-details/seeker-education-details.component';
import { SeekerProfilePageComponent } from './seeker-profile-page.component';
import { SeekerSkillsPageComponent } from './seeker-skills-page/seeker-skills-page.component';
import { SeekerCertificationPageComponent } from './seeker-certification-page/seeker-certification-page.component';
import { SeekerResumePageComponent } from './seeker-resume-page/seeker-resume-page.component';
import { SeekerProjectPageComponent } from './seeker-project-page/seeker-project-page.component';
import { RouterModule } from '@angular/router';
import { SeekerProfileRoutingModule } from './seeker-profile-routing.module';

@NgModule({
  declarations: [
    SeekerBasicDetailsComponent,
    SeekerEducationDetailsComponent,
    SeekerProfilePageComponent,
    SeekerSkillsPageComponent,
    SeekerCertificationPageComponent,
    SeekerResumePageComponent,
    SeekerProjectPageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SeekerProfileRoutingModule  // Import the routing module here
  ],
  providers: [],
})
export class SeekerProfileModule { }
