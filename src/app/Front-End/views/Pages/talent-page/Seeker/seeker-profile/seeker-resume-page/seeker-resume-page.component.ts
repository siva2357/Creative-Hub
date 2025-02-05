import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-seeker-resume-page',
  templateUrl: './seeker-resume-page.component.html',
  styleUrls: ['./seeker-resume-page.component.css']
})
export class SeekerResumePageComponent {
  isResume:boolean = false;
  isDocument:boolean = false;
  isWriteUp:boolean = false;

  resumeForm!: FormGroup;
    
        constructor(private fb: FormBuilder) {}
      
        ngOnInit(): void{
          this.initializeResumeForm();
        }
      
        initializeResumeForm() {
          this.resumeForm = this.fb.group({
            _id: [null],
            resumeTitle: ['', [Validators.required]],
            resumeUpload: [null, [Validators.required]],
          });
        }

    
        saveResume() {
    
        }



}
