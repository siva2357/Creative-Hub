import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RecruiterHireSeekerPageComponent } from './recruiter-hire-seeker/recruiter-hire-seeker.component';
import { RecruiterMainPageComponent } from './recruiter-main-page.component';
import { RecruiterPagesRoutingModule } from './recruiter-pages-routing.module';
import { LayoutModule } from '../../../Layouts/layout.module';
import { SharedModule } from '../../../shared/shared.module';
import { RecruiterProfilePageComponent } from './recruiter-profile/recruiter-profile-page.component';
import { RecruiterDashboardComponent } from './recruiter-dashboard/recruiter-dashboard.component';
import { RecruiterPostJobPageComponent } from './recruiter-post-job/recruiter-post-job.component';
import { RecruiterManageJobPageComponent } from './recruiter-manage-job/recruiter-manage-job.component';
import { RecruiterClosedJobsPageComponent } from './recruiter-closed-jobs/recruiter-closed-jobs.component';
import { RecruiterJobApplicantsPageComponent } from './recruiter-job-applicants/recruiter-job-applicants.component';

@NgModule({
  declarations: [
    RecruiterMainPageComponent,
    RecruiterHireSeekerPageComponent,
    RecruiterProfilePageComponent,
    RecruiterDashboardComponent,
    RecruiterPostJobPageComponent,
    RecruiterManageJobPageComponent,
    RecruiterClosedJobsPageComponent,
    RecruiterJobApplicantsPageComponent
  ],
  imports: [
    CommonModule,
    RecruiterPagesRoutingModule,
    HttpClientModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule ,
    SharedModule
  ],
  providers: [DatePipe],
})
export class RecruiterPageModule { }
