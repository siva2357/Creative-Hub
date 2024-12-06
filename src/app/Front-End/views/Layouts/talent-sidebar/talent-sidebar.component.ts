import { Component, EventEmitter, Input} from '@angular/core';
import { MenuItem } from 'src/app/Front-End/core/models/sidebar-menu.model';

@Component({
  selector: 'app-talent-sidebar',
  templateUrl: './talent-sidebar.component.html',
  styleUrls: ['./talent-sidebar.component.css']
})
export class TalentSidebarComponent {

  @Input() menu = new EventEmitter <MenuItem>; // Event emitter for job selection
  @Input() menuItems: MenuItem[] = []; // Receives the menu items array

}
