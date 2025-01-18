import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LayoutModule } from "../../../../Layouts/layout.module";
import { RecruiterInterviewPageComponent } from './recruiter-interview.component';
import { RecruiterCalenderComponent } from './recruiter-calender/recruiter-calender.component';
import { RecruiterInterviewRoutingModule } from './recruiter-interview-routing.module';
import { RecruiterScheduleInterviewComponent } from './recruiter-schedule-interview/recruiter-schedule-interview.component';
import { RecruiterMeetingComponent } from './recruiter-meeting/recruiter-meeting.component';

@NgModule({
  declarations: [
    RecruiterInterviewPageComponent,
    RecruiterCalenderComponent,
    RecruiterScheduleInterviewComponent,
    RecruiterMeetingComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RecruiterInterviewRoutingModule ,
    LayoutModule
],
  providers: [],
})
export class RecruiterInterviewModule { }
