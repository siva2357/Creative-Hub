import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-seeker-certification-page',
  templateUrl: './seeker-certification-page.component.html',
  styleUrls: ['./seeker-certification-page.component.css']
})
export class SeekerCertificationPageComponent {
  isCertificate:boolean = false;


    isSocialMedia:boolean = false;
    certificateForm!: FormGroup;
  
      constructor(private fb: FormBuilder) {}
    
      ngOnInit(): void{
    
        this.initializeCertificateForm();
      }
    
      initializeCertificateForm() {
        this.certificateForm = this.fb.group({
          _id: [null],
          courseName: ['', [Validators.required]],
          associatedAuthority: ['', [Validators.required]],
          certificationURL: ['', [Validators.required]],
          certificationDate: ['', [Validators.required]],
          ceritificationDescription: ['', [Validators.required]],
          certificateUpload: [null, [Validators.required]],
        });
      }
  
  
      saveCertificate() {
  
      }

}
