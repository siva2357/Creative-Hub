import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { LayoutModule } from '../../../Layouts/layout.module';
import { AdminPageComponent } from './admin-page.component';
import { AdminPagesRoutingModule } from './admin-pages-routing.module';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminManageUserPageComponent } from './admin-manage-users/admin-manage-users.component';
import { AdminProfilePageComponent } from './admin-profile/admin-profile-page.component';
import { AdminUserActivityPageComponent } from './admin-user-activity/admin-user-activity.component';
import { AdminUserDataPageComponent } from './admin-user-data/admin-user-data.component';
@NgModule({
  declarations: [
    AdminPageComponent,
    AdminDashboardComponent,
    AdminManageUserPageComponent,
    AdminProfilePageComponent,
    AdminUserActivityPageComponent,
    AdminUserDataPageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule ,
    AdminPagesRoutingModule
  ],
  providers: [DatePipe],

})
export class AdminPageModule { }
