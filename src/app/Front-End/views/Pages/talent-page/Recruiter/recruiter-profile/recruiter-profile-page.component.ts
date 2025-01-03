import { Component} from '@angular/core';
import { ProfileBar } from 'src/app/Front-End/core/models/sidebar-menu.model';
@Component({
  selector: 'app-recruiter-profile-page',
  templateUrl: './recruiter-profile-page.component.html',
  styleUrls: ['./recruiter-profile-page.component.css']
})
export class RecruiterProfilePageComponent {
   profile:  ProfileBar[] = [
    { label: 'Basic Details', link: 'basic'},
    { label: 'Professional Details', link: 'profession'},
    { label: 'Skills,Subjects & Languages', link: 'skills'},
    { label: 'Certifications', link: 'certifications'},
    { label: 'Resume, Docs & Write-ups', link: 'resume'},
  ];


}
