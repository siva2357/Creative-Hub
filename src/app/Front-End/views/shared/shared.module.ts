import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SeekerProfileCardComponent } from './seeker-profile-card/seeker-profile-card.component';
import { JobTableComponent } from './job-table/job-table.component';

@NgModule({
  declarations: [
    SeekerProfileCardComponent,
    JobTableComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    SeekerProfileCardComponent,
    JobTableComponent,
    CommonModule,
  ],

  providers: [DatePipe],
  bootstrap: []
})
export class SharedModule { }
