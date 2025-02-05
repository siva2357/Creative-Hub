import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-talent-header',
  templateUrl: './talent-header.component.html',
  styleUrls: ['./talent-header.component.css']
})
export class TalentHeaderComponent{

  constructor(private router: Router){}

  goToSettings(){
    this.router.navigateByUrl('talent-page/settings-page')
  }
}
