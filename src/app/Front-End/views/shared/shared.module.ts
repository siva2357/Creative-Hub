import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SeekerProfileCardComponent } from './seeker-profile-card/seeker-profile-card.component';
import { RegistrationConfirmationComponent } from './confirmation-page/confirmation-page.component';
import { LayoutModule } from '../Layouts/layout.module';
import { JobTableComponent } from './job-table/job-table.component';

@NgModule({
  declarations: [
    RegistrationConfirmationComponent,
    SeekerProfileCardComponent,
    ProjectDetailsComponent,
    JobTableComponent 
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule
  ],
  exports: [
    RegistrationConfirmationComponent,
    SeekerProfileCardComponent,
    ProjectDetailsComponent,
    JobTableComponent,
    CommonModule, 
  ],

  providers: [DatePipe],
  bootstrap: []
})
export class SharedModule { }
