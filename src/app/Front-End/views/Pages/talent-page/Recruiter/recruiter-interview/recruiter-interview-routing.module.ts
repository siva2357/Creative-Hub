import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecruiterInterviewPageComponent } from './recruiter-interview.component';
import { RecruiterScheduleInterviewComponent } from './recruiter-schedule-interview/recruiter-schedule-interview.component';
import { RecruiterCalenderComponent } from './recruiter-calender/recruiter-calender.component';
import { RecruiterMeetingComponent } from './recruiter-meeting/recruiter-meeting.component';
const routes: Routes = [
	{ path: '', component: RecruiterInterviewPageComponent,
	  children: [
		{ path: '', redirectTo: 'schedule-interview', pathMatch: 'full' },
		{ path: 'schedule-interview', component: RecruiterScheduleInterviewComponent },
		{ path: 'calender-page', component:  RecruiterCalenderComponent },
		{ path: 'meeting-page', component:  RecruiterMeetingComponent },

	  ]
	}
  ];
  
  
  


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RecruiterInterviewRoutingModule { }
