import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecruiterBasicDetailsComponent } from './recruiter-basic-details/recruiter-basic-details.component';
import { RecruiterProfilePageComponent } from './recruiter-profile-page.component';
import { RecruiterProfessionalDetailsComponent } from './recruiter-professional-details/recruiter-professional-details.component';
import { RouterModule } from '@angular/router';
import { RecruiterProfileRoutingModule} from './recruiter-profile-routing.module';


@NgModule({
  declarations: [
    RecruiterBasicDetailsComponent,
    RecruiterProfessionalDetailsComponent,
    RecruiterProfilePageComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RecruiterProfileRoutingModule,
],
  providers: [],
})
export class RecruiterProfileModule { }
