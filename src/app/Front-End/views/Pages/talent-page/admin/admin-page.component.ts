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
    { label: 'User Data', link: 'user-data', icon: 'bi bi-database' },
  ];

}
