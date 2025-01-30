import { Component} from '@angular/core';
import { MenuItem } from 'src/app/Front-End/core/models/sidebar-menu.model';
import { Recruiter, Seeker } from 'src/app/Front-End/core/models/user-registration.model';

@Component({
  selector: 'app-recruiter-main-page',
  templateUrl: './recruiter-main-page.component.html',
  styleUrls: ['./recruiter-main-page.component.css']
})
export class RecruiterMainPageComponent {
  constructor() { }


    userDetails!: Seeker | Recruiter;

  menu: MenuItem[] = [
    { label: 'Dashboard', link: 'dashboard', icon: 'bi bi-grid' },
    { label: 'My Profile', link: 'profile', icon: 'bi bi-person-circle' },
    { label: 'Post Job', link: 'post-job', icon: 'bi bi-plus-square' },
    { label: 'Manage Jobs', link: 'manage-jobs', icon: 'bi bi-pencil-square' },
    { label: 'Closed Jobs', link: 'closed-jobs', icon: 'bi bi-archive' },
    { label: 'Job Applicants', link: 'job-applicants', icon: 'bi bi-people-fill' },
    { label: 'Hire Seeker', link: 'hire-seeker', icon: 'bi bi-person-add' },
  ];


    handleUserDetails(userDetails: Seeker | Recruiter): void {
      this.userDetails = userDetails;
      // Here you can perform any further action, e.g., navigate or display more data
      console.log('Received user details:', userDetails);
    }


}
