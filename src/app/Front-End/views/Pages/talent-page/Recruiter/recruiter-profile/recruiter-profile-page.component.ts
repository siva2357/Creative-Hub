import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { ProfileBar } from 'src/app/Front-End/core/models/sidebar-menu.model';
import { Recruiter, Seeker } from 'src/app/Front-End/core/models/user-registration.model';
import { AuthService } from 'src/app/Front-End/core/services/auth.service';
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
    constructor(private router: Router, private authService: AuthService) { }
    ngOnInit(): void {

    }


}
