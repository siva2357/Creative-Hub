import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Recruiter } from 'src/app/Front-End/core/models/user-registration.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Folder } from 'src/app/Front-End/core/enums/folder-name.enum';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-register-recruiter',
  templateUrl: './register-recruiter.component.html',
  styleUrls: ['./register-recruiter.component.css']
})

export class RegisterRecruiterComponent implements OnInit {
  registrationForm!: FormGroup;
  registrationSuccess: boolean = false;
  step = 1;
  profileUploadUrl: string | ArrayBuffer | null = null;
  isImageUploaded: boolean = false;
  isLoading: boolean = false;
  isSubmitting = false;
  errorMessage = '';


  uploadedFileData: { fileName: string; url: string; filePath: string } | null = null;
  ifPreview = false;
  previewURL: SafeResourceUrl | null = null;
  fileRef: any; // Firebase reference for file deletion
  fileType: string | null = null; // Store the file type (image, video, pdf, audio, etc.)
  fileUploadProgress: Observable<number | undefined> | undefined;
  uploadComplete = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private domSanitizer: DomSanitizer,
    private storage: AngularFireStorage,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registrationForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
      profilePicture: [null, Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  get controls() {
    return this.registrationForm.controls;
  }

  passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword
      ? { mismatch: true }
      : null;
  }

  next(): void {
    if (this.step === 1) {
      if (this.registrationForm.get('fullName')?.invalid || this.registrationForm.get('userName')?.invalid || this.registrationForm.get('email')?.invalid) {
        return;
      }
      this.step++;
    }
    if (this.step === 2) {
      if (this.registrationForm.get('password')?.invalid || this.registrationForm.get('confirmPassword')?.invalid) {
        return;
      }
      this.step++;
    }
    if (this.step === 3) {
      if (this.registrationForm.get('profilePicture')?.invalid) {
        return;
      }
      this.submit();
    }
  }

  isStepValid(): boolean {
    switch (this.step) {
      case 1:
        return (this.registrationForm.get('fullName')?.valid ?? false) &&
               (this.registrationForm.get('userName')?.valid ?? false) &&
               (this.registrationForm.get('email')?.valid ?? false);
      case 2:
        return (this.registrationForm.get('password')?.valid ?? false) &&
               (this.registrationForm.get('confirmPassword')?.valid ?? false);
      case 3:
        return (this.registrationForm.get('profilePicture')?.valid ?? false);
      default:
        return false;
    }

  }



  previous(): void {
    if (this.step > 1) {
      this.step--;
    }
  }

uploadFile(event: any) {
}



deletePreview(): void {
}


getFileType(file: File): string {
  const mimeType = file.type;

  if (mimeType.startsWith('image/')) {
    return 'image';
  } else if (mimeType.startsWith('video/')) {
    return 'video';
  } else if (mimeType === 'application/pdf') {
    return 'pdf';
  } else if (mimeType.startsWith('audio/')) {
    return 'audio';
  } else {
    return 'unknown'; // For other file types (could be handled further)
  }
}


  submit() {
  }

  LoginPage(): void {
    this.router.navigate(['talent-page/login']);
  }

  back(): void {
    this.router.navigate(['talent-page/signup']);
  }
}
