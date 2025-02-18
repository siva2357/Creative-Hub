import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Seeker } from 'src/app/Front-End/core/models/profile-details.model';
@Component({
  selector: 'app-seeker-basic-details',
  templateUrl: './seeker-basic-details.component.html',
  styleUrls: ['./seeker-basic-details.component.css']
})
export class SeekerBasicDetailsComponent {


  isSocialMedia:boolean = false;
  socialMediaForm!: FormGroup;

    constructor(private fb: FormBuilder) {}
  
    ngOnInit(): void{
  
      this.initializeForm();
    }
  
    initializeForm() {
      this.socialMediaForm = this.fb.group({
        _id: [null],
        socialMediaProfile: ['', [Validators.required]],
        socialMediaLink: ['', [Validators.required]],
      });
    }


    save() {

    }


}
