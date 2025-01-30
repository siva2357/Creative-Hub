import { Component } from '@angular/core';
import { MenuItem } from 'src/app/Front-End/core/models/sidebar-menu.model';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {

  constructor() { }

  menu: MenuItem[] = [
    { label: 'Dashboard', link: 'dashboard', icon: 'bi bi-grid' },
    { label: 'My Profile', link: 'profile', icon: 'bi bi-person-circle' },
    { label: 'User Data', link: 'user-data', icon: 'bi bi-database' },
    { label: 'User Activity', link: 'user-activity', icon: 'bi bi-graph-up' },
    { label: 'Manage Users', link: 'manage-users', icon: 'bi bi-pencil-square' },

  ];

}
