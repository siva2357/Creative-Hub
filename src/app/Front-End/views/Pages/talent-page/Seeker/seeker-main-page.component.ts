import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/Front-End/core/models/sidebar-menu.model';

@Component({
  selector: 'app-seeker-main-page',
  templateUrl: './seeker-main-page.component.html',
  styleUrls: ['./seeker-main-page.component.css']
})
export class SeekerMainPageComponent implements OnInit{
  constructor() { }
  ngOnInit(): void {
    
  }
  menu: MenuItem[] = [
    { label: 'Dashboard', link: 'dashboard', icon: 'bi bi-grid'},
    { label: 'My Profile', link: 'profile', icon: 'bi bi-person-circle'},
    { label: 'Job Profile', link: 'jobProfile', icon: 'bi bi-suitcase-lg'},
    { label: 'Post project', link: 'post-project', icon: 'bi bi-plus-square'},
    { label: 'Portfolio', link: 'portfolio', icon: 'bi bi-grid-3x3-gap'},
    { label: 'Manage project', link: 'manage-project', icon: 'bi bi-pencil-square'},
    { label: 'Launchpad', link: 'launchPad', icon: 'bi bi-rocket-takeoff'},
  ];
  
}
