import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Seeker } from 'src/app/Front-End/core/models/user-registration.model';
import { AlertService } from 'src/app/Front-End/core/services/alerts.service';
import { AuthService } from 'src/app/Front-End/core/services/auth.service';

@Component({
  selector: 'app-seeker-edit-profile',
  templateUrl: './seeker-edit-profile.component.html',
  styleUrls: ['./seeker-edit-profile.component.css']
})
export class SeekerEditProfileComponent implements OnInit {


  @Input() profile!: Seeker;
  isLoading: boolean = false;

  profileActive: boolean = true;
  signupDetails!: FormGroup;

    registrationDetails!: FormGroup;
    contactDetails!: FormGroup;
    educationDetails!: FormGroup;
    bioDetails!: FormGroup;
    profileDetails!: FormGroup;
    profileId!: string;
    errorMessage: string = '';
    isEditMode: boolean = false;
    updateSuccess :boolean = false;

    cities: string[] = ['Hyderabad', 'Mumbai', 'Delhi', 'Chennai'];
    states: string[] = ['Telangana', 'Maharashtra', 'Karnataka', 'Tamil Nadu'];
    countries: string[] = ['Telangana', 'Maharashtra', 'Karnataka', 'Tamil Nadu'];

    genders: string[] = ['Male', 'Female', 'Other'];
    instituteName: string[] = ['A', 'B', 'C', 'D'];
    programOrDegree: string[] = ['E', 'F', 'G', 'H'];
    departmentName: string[] = ['I', 'J', 'K', 'L'];
    branchName: string[] = ['M', 'N', 'O', 'P'];

     profileUploadUrl: string | ArrayBuffer | null = null;
     isImageUploaded: boolean = false;


    constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private alertService: AlertService,    private activatedRouter: ActivatedRoute ) {}

    ngOnInit(): void {
      this.activatedRouter.paramMap.subscribe((param: Params) => {
        this.profileId = param['get']('id')!;
        console.log('Project ID:', this.profileId);
      });

      this.authService.getSeekerById(this.profileId).subscribe(
        (profileData:  Seeker) => {
          this.profile = profileData;
          if (this.profile) {
            this.initializeForm();
          } else {
            this.errorMessage = 'Project data not found';
          }
        },
        (error) => {
          this.errorMessage = 'Failed to load project data';
        }
      );
    }

      initializeForm(): void {
        // this.signupDetails = this.formBuilder.group({
        //   fullName: [this.profile.registrationDetails.fullName  || '', [Validators.required]], // Capital letter, only letters
        //   userName: [this.profile.registrationDetails.userName || '', [Validators.required]], // Starts with capital, letters and numbers
        //   gender: [this.profile.registrationDetails.gender || '', [Validators.required]], // Starts with capital, letters and numbers
        // },);

        // this.contactDetails = this.formBuilder.group({
        //   phoneNumber: [this.profile.registrationDetails.contactDetails.phoneNumber, [Validators.required]], // Starts with capital, letters and numbers
        //   streetAddress: ['', [Validators.required]],
        //   city: [this.profile.registrationDetails.contactDetails.city || '',[Validators.required]],
        //   state: [this.profile.registrationDetails.contactDetails.state || '',[Validators.required]],
        //   country: [this.profile.registrationDetails.contactDetails.country || '',[Validators.required]],
        //   pincode: [this.profile.registrationDetails.contactDetails.pincode || '', [Validators.required]]
        // });

        // this.educationDetails = this.formBuilder.group({
        //   instituteName: [this.profile.registrationDetails.educationDetails.instituteName || '',[Validators.required]],
        //   programOrDegree: [this.profile.registrationDetails.educationDetails.programOrDegree || '',[Validators.required]],
        //   departmentName: [this.profile.registrationDetails.educationDetails.departmentName || '',[Validators.required]],
        //   branchOrSpecialization: [this.profile.registrationDetails.educationDetails.branchOrSpecialization || '',[Validators.required]],
        //   instituteRollNumber: [this.profile.registrationDetails.educationDetails.instituteRollNumber || '', [Validators.required]]
        // });

        // this.bioDetails = this.formBuilder.group({
        //   bio: [this.profile.registrationDetails.bioDetails.bio || '',[Validators.required]]
        // });

        // this.profileDetails = this.formBuilder.group({
        //   profilePicture: [null, Validators.required]
        // });
      }


      get signup() { return this.signupDetails.controls; }
      get contact() { return this.contactDetails.controls; }
      get education() { return this.educationDetails.controls; }
      get bio() { return this.bioDetails.controls; }
      get profilePicture() { return this.profileDetails.controls; }



      passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
        const password = formGroup.get('password')?.value;
        const confirmPassword = formGroup.get('confirmPassword')?.value;

        if (password && confirmPassword) {
            return password === confirmPassword ? null : { mismatch: true };
        }
        return null;
    }


    handleFileUpload(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        this.profileDetails.get('profileUpload')?.setErrors(null); // Clear previous errors

        const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
          this.profileDetails.get('profileUpload')?.setErrors({ invalidFileType: true });
          this.alertService.showProfileImageFormatAlert();
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          this.profileUploadUrl = reader.result;
          this.isImageUploaded = true;
        };
        reader.readAsDataURL(file);
      } else {
        this.profileDetails.get('profileUpload')?.setErrors({ required: true });
        this.alertService.showProfileImageAlert();
      }
    }

    discardChanges(){

    }

    update(): void {
      // if (
      //   this.signupDetails.valid &&
      //   this.contactDetails.valid &&
      //   this.educationDetails.valid &&
      //   this.bioDetails.valid &&
      //   this.profileDetails.valid
      // ) {
      //   if (this.signupDetails.value.password !== this.signupDetails.value.confirmPassword) {
      //     console.error('Passwords do not match');
      //     return;
      //   }

      //   const seekerData: Seeker = {
      //     registrationDetails: {
      //       signupDetails: {
      //         fullName: this.signupDetails.value.fullName,
      //         userName: this.signupDetails.value.userName,
      //         gender: this.signupDetails.value. gender,
      //         email: this.signupDetails.value.email,
      //         password: this.signupDetails.value.password,
      //         confirmPassword: this.signupDetails.value.confirmPassword,
      //       },
      //       contactDetails: {
      //         phoneNumber: this.contactDetails.value.phoneNumber,
      //         streetAddress: this.contactDetails.value.streetAddress,
      //         city: this.contactDetails.value.city,
      //         state: this.contactDetails.value.state,
      //         country: this.contactDetails.value.country,
      //         pincode: this.contactDetails.value.pincode,
      //       },
      //       educationDetails: {
      //         instituteName: this.educationDetails.value.instituteName, // Check this value
      //         programOrDegree: this.educationDetails.value.programOrDegree,
      //         departmentName: this.educationDetails.value.departmentName,
      //         branchOrSpecialization: this.educationDetails.value.branchOrSpecialization,
      //         instituteRollNumber: this.educationDetails.value.instituteRollNumber,
      //       },
      //       bioDetails: {
      //         bio: this.bioDetails.value.bio,
      //       },
      //       profileDetails: {
      //         profilePicture: this.profileDetails.value.profileUpload
      //       },
      //     },
      //   };

      //   this.isLoading = true;

      //   this.authService.registerSeeker(seekerData).subscribe(
      //     (response) => {
      //       console.log('Registration successful', response);
      //       this.updateSuccess = true;
      //       this.alertService.showAccountRegisteredSuccess();
      //       setTimeout(() => {
      //         this.isLoading = false;
      //         this.router.navigate(['talent-page/register/confirmation-page']);
      //       }, 3000);
      //     },

      //     (error) => {
      //       this.updateSuccess = false;
      //       console.error('Registration failed', error);
      //       // this.alertService.showErrorRegisteringAccount();
      //       setTimeout(() => {
      //         this.isLoading = false;
      //         this.router.navigate(['talent-page/register/error-page']);
      //       }, 3000);
      //     }
      //   );
      }


      goBack(): void {
        this.router.navigateByUrl('talent-page/seeker/profile');
      }

      openEditMode(): void {
        if (this.profileActive) {
          this.isEditMode = true;
          this.registrationDetails.enable();
        } else {
          this.errorMessage = 'Project is closed, unable to edit.';
          this.registrationDetails.disable();
        }
      }


    }



