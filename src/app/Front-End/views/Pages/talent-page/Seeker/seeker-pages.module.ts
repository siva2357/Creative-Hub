import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { SeekerMainPageComponent } from './seeker-main-page.component';
import { SeekerPagesRoutingModule } from './seeker-pages-routing.module';
import { SeekerPortfolioComponent } from './seeker-portfolio/seeker-portfolio.component';
import { SeekerDashboardComponent } from './seeker-dashboard/seeker-dashboard.component';
import { SeekerJobProfileComponent } from './seeker-jobProfile/seeker-jobProfile.component';
import { SeekerLaunchpadComponent } from './seeker-launchPad/seeker-launchPad.component';
import { SeekerManageProjectPageComponent } from './seeker-manage-project/seeker-manage-project.component';
import { SeekerPostProjectPageComponent } from './seeker-post-project/seeker-post-project.component';
import { LayoutModule } from '../../../Layouts/layout.module';
import { SharedModule } from '../../../shared/shared.module';
import { SeekerProfileRoutingModule } from './seeker-profile/seeker-profile-routing.module';
import { SeekerProfileModule } from './seeker-profile/seeker-profile.module';

@NgModule({
  declarations: [
    SeekerMainPageComponent,
    SeekerPortfolioComponent,
    SeekerDashboardComponent,
    SeekerJobProfileComponent,

    SeekerLaunchpadComponent,
    SeekerManageProjectPageComponent,
    SeekerPostProjectPageComponent ,

  ],
  imports: [
    CommonModule,
    SeekerPagesRoutingModule,
    SeekerProfileRoutingModule,
    HttpClientModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SeekerProfileModule
  ],
  providers: [DatePipe],
})
export class SeekerPageModule { }
