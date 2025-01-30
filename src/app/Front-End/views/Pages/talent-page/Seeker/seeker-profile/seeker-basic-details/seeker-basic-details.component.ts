import { Component, Input } from '@angular/core';
import { Seeker } from 'src/app/Front-End/core/models/user-registration.model';

@Component({
  selector: 'app-seeker-basic-details',
  templateUrl: './seeker-basic-details.component.html',
  styleUrls: ['./seeker-basic-details.component.css']
})
export class SeekerBasicDetailsComponent {
  @Input() profileDetails!: Seeker;

  isSocialMedia:boolean = false;

  constructor() {}

  ngOnInit(): void {}


}
