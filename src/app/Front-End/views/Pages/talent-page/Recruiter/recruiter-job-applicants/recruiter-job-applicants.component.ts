import { Component } from '@angular/core';

@Component({
  selector: 'app-recruiter-job-applicants',
  templateUrl: './recruiter-job-applicants.component.html',
  styleUrls: ['./recruiter-job-applicants.component.css']
})
export class RecruiterJobApplicantsPageComponent {
  public jobApplicants: any[] = [];

get hasjobApplicants(): boolean {
  return this.jobApplicants.length > 0;
}

}
