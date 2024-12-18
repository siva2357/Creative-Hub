import { Component} from '@angular/core';
import { ProfileBar } from 'src/app/Front-End/core/models/sidebar-menu.model';
@Component({
  selector: 'app-seeker-profile-page',
  templateUrl: './seeker-profile-page.component.html',
  styleUrls: ['./seeker-profile-page.component.css']
})
export class SeekerProfilePageComponent {
  
   profile:  ProfileBar[] = [
    { label: 'Basic Details', link: 'basic'},
    { label: 'Education Details', link: 'education'},
    { label: 'Skills,Subjects & Languages', link: 'skills'},
    { label: 'Certifications', link: 'certifications'},
    { label: 'Resume, Docs & Write-ups', link: 'resume'},

  ];


}
