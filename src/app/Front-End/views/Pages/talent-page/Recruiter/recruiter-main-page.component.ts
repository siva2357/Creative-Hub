import { Component} from '@angular/core';
import { MenuItem } from 'src/app/Front-End/core/models/sidebar-menu.model';

@Component({
  selector: 'app-recruiter-main-page',
  templateUrl: './recruiter-main-page.component.html',
  styleUrls: ['./recruiter-main-page.component.css']
})
export class RecruiterMainPageComponent {
  constructor() { }

  menu: MenuItem[] = [
    { label: 'Dashboard', link: 'dashboard', icon: 'bi bi-grid' }, 
    { label: 'My Profile', link: 'profile', icon: 'bi bi-person-circle' }, 
    { label: 'Post Job', link: 'post-job', icon: 'bi bi-plus-square' },
    { label: 'Manage Jobs', link: 'manage-jobs', icon: 'bi bi-pencil-square' },
    { label: 'Closed Jobs', link: 'closed-jobs', icon: 'bi bi-archive' },
    { label: 'Job Applicants', link: 'job-applicants', icon: 'bi bi-people-fill' }, 
    { label: 'Interview', link: 'interview', icon: 'bi bi-laptop' }, 
    { label: 'Reports', link: 'reports', icon: 'bi bi-bar-chart' }, 
    { label: 'Hire Seeker', link: 'hire-seeker', icon: 'bi bi-person-add' },
  ];
  
  
}
