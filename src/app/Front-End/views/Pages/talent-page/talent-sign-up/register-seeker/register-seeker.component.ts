import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Front-End/core/services/auth.service';
import { Seeker } from 'src/app/Front-End/core/models/user-registration.model';
import { AlertService } from 'src/app/Front-End/core/services/alerts.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Folder } from 'src/app/Front-End/core/enums/folder-name.enum';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-register-seeker',
  templateUrl: './register-seeker.component.html',
  styleUrls: ['./register-seeker.component.css']
})

export class RegisterSeekerComponent implements OnInit {
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
    private authService: AuthService,
    private alertService: AlertService,
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
  const file = event.target.files && event.target.files[0];
  if (file) {

    const filePath = `${Folder.Main_Folder}/${Folder.Seeker_Folder}/${Folder.Seeker_Sub_Folder_1}/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    // this.previewURL = URL.createObjectURL(file);
    this.previewURL = this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));

    this.fileType = this.getFileType(file);

    this.fileUploadProgress = task.percentageChanges();
    this.ifPreview = true;

    task.snapshotChanges().subscribe({
      next: (snapshot) => {
        if (snapshot?.state === 'success') {
          fileRef.getDownloadURL().subscribe((url) => {
            console.log('File uploaded successfully. URL:', url);

            // Store the file details for later submission
            this.uploadedFileData = {
              fileName: file.name,
              url: url,
              filePath: filePath // Save the file path for deletion
            };
            this.uploadComplete = true;
          });
        }
      },
      error: (error) => {
        console.error('Upload error:', error);
        this.errorMessage = 'File upload failed. Please try again.';
      }
    });

  }

}



deletePreview(): void {
  this.previewURL = null;
  this.fileType = null;
  this.fileUploadProgress = undefined;
  this.uploadComplete =false;

  if (this.uploadedFileData) {
    const { filePath } = this.uploadedFileData;

    this.storage.ref(filePath).delete().subscribe({
      next: () => {
        console.log('File deleted from Firebase Storage');
        this.uploadedFileData = null;
        this.ifPreview = false;
      },
      error: (error) => {
        console.error('Error deleting file from Firebase Storage:', error);
        this.errorMessage = 'Failed to delete the file. Please try again.';
      }
    });
  }
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
    if (this.registrationForm.valid && this.uploadedFileData) {
      const seekerData: Seeker = {
      registrationDetails: {
        fullName: this.registrationForm.value.fullName,
        userName: this.registrationForm.value.userName,
        email: this.registrationForm.value.email,
        password: this.registrationForm.value.password,
        confirmPassword: this.registrationForm.value.confirmPassword,
        profilePicture: this.uploadedFileData, //

      }
    };
      console.log('Seeker Data:', seekerData); // Add this line to check the data
      this.isSubmitting = true;
      this.authService.registerSeeker(seekerData).subscribe({
        next: () => {
          this.registrationForm.reset({});
          this.uploadedFileData = null;
          this.isSubmitting = false;
          this.previewURL = null;
          this.ifPreview = false;
          this.uploadComplete= false;
          this.fileUploadProgress = undefined;
        },
        error: (err) => {
          console.error('Error submitting project:', err);
          this.errorMessage = 'Project submission failed. Please try again.';
          this.isSubmitting = false;
        }
      });
    }
  }

  LoginPage(): void {
    this.router.navigate(['talent-page/login']);
  }

  back(): void {
    this.router.navigate(['talent-page/signup']);
  }
}
