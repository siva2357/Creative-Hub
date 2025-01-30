import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { TalentPageComponent } from './talent-page.component';

import { TalentMainPageComponent } from './talent-main-page/talent-main-page.component';
import { TalentLoginComponent } from './talent-login/talent-login.component';
import { TalentSignUpComponent } from './talent-sign-up/talent-sign-up.component';
import { RegisterSeekerComponent } from './talent-sign-up/register-seeker/register-seeker.component';
import { RegisterRecruiterComponent } from './talent-sign-up/register-recruiter/register-recruiter.component';
import { ConfirmationComponent } from './talent-sign-up/account-confirmation/account-confirmation.component';
import { ErrorRegisterComponent } from './talent-sign-up/error-account-register/account-confirmation.component';

const routes: Routes = [
  // Default path for recruiter redirects to 'recruiter/dashboard'
  { path: '', redirectTo: 'main', pathMatch: 'full' },

  {
    path: '', component:  TalentPageComponent, // Main layout component with sidebar
    children: [
    { path: 'main', component:  TalentMainPageComponent},
    { path: 'login', component:  TalentLoginComponent }, // Profile page route
    { path: 'signup', component: TalentSignUpComponent }, // Profile page route
    { path: 'register/seeker', component: RegisterSeekerComponent }, // Profile page route
    { path: 'register/recruiter', component: RegisterRecruiterComponent }, // Profile page route

    { path: 'register/confirmation-page', component: ConfirmationComponent }, // Profile page route
    { path: 'register/error-page', component: ErrorRegisterComponent }, // Profile page route
    { path: 'recruiter',loadChildren: () => import('./Recruiter/recruiter-pages.module').then((m) => m.RecruiterPageModule),
      // canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'recruiter' }
    },
    { path: 'seeker',loadChildren: () => import('./Seeker/seeker-pages.module').then((m) => m.SeekerPageModule),
      // canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'recruiter' }
    },

    { path: 'admin',loadChildren: () => import('./admin/admin-pages.module').then((m) => m.AdminPageModule),
      // canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'recruiter' }
    },
    ]
  }
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TalentPagesRoutingModule { }
