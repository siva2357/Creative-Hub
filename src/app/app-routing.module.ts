import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Public and Shared Components
import { MainPageComponent } from './Front-End/views/Pages/main-page/main-page.component';
import { LearnPageComponent } from './Front-End/views/Pages/learn-page/learn-page.component';
import { ForDeveloperComponent } from './Front-End/views/Pages/for-developer/for-developer.component';
import { AboutPageComponent } from './Front-End/views/Pages/about-page/about-page.component';
import { BlogPageComponent } from './Front-End/views/Pages/blog-page/blog-page.component';
import { MarketPageComponent } from './Front-End/views/Pages/market-page/market-page.component';
import { PublishPageComponent } from './Front-End/views/Pages/publish-page/publish-page.component';
import { PurposePageComponent } from './Front-End/views/Pages/purpose-page/purpose-page.component';
import { CloudPageComponent } from './Front-End/views/Pages/cloud-page/cloud-page.component';
import { TalentMainPageComponent } from './Front-End/views/Pages/talent-page/talent-main-pagecomponent';
import { TalentLoginComponent } from './Front-End/views/Pages/talent-page/talent-login/talent-login.component';
import { TalentSignUpComponent } from './Front-End/views/Pages/talent-page/talent-sign-up/talent-sign-up.component';
import { RegisterSeekerComponent } from './Front-End/views/Pages/talent-page/talent-sign-up/register-seeker/register-seeker.component';
import { RegisterRecruiterComponent } from './Front-End/views/Pages/talent-page/talent-sign-up/register-recruiter/register-recruiter.component';
import { RoleGuard } from './Front-End/core/guards/role.guard';
import { AuthGuard } from './Front-End/core/guards/auth.guard';


const routes: Routes = [
  // Public routes
  { path: 'main', component: MainPageComponent, title: 'Main page' },
  { path: 'for-developer', component: ForDeveloperComponent, title: 'For Developer page' },
  { path: 'learn-page', component: LearnPageComponent, title: 'Learn page' },
  { path: 'about-page', component: AboutPageComponent, title: 'About Page' },
  { path: 'blog-page', component: BlogPageComponent, title: 'Blog Page' },
  { path: 'market-page', component: MarketPageComponent, title: 'Market Page' },
  { path: 'publish-page', component: PublishPageComponent, title: 'Publish Page' },
  { path: 'purpose-page', component: PurposePageComponent, title: 'Purpose Page' },
  { path: 'cloud-page', component: CloudPageComponent, title: 'Cloud Page' },
  { path: 'talent-page', component: TalentMainPageComponent, title: 'Talent Page' },
  { path: 'talent-page/login', component: TalentLoginComponent, title: 'Talent Login Page' },
  { path: 'talent-page/signup', component: TalentSignUpComponent, title: 'Talent Login Page' },
  { path: 'talent-page/register/seeker', component: RegisterSeekerComponent, title: 'Talent Login Page' },
  { path: 'talent-page/register/recruiter', component: RegisterRecruiterComponent, title: 'Talent Login Page'  },

  {
    path: 'talent-page/recruiter',
    loadChildren: () => import('./Front-End/views/Pages/talent-page/Recruiter/recruiter-pages.module').then((m) => m.RecruiterPageModule),
    // canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'recruiter' } 
  },

  {
    path: 'talent-page/seeker',
    loadChildren: () => import('./Front-End/views/Pages/talent-page/Seeker/seeker-pages.module').then((m) => m.SeekerPageModule),
    // canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'recruiter' } 
  },

  {
    path: 'talent-page/admin',
    loadChildren: () => import('./Front-End/views/Pages/talent-page/admin/admin-pages.module').then((m) => m.AdminPageModule),
    // canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'recruiter' } 
  },
  

  { path: '**', redirectTo: 'main' }, // Fallback rou

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
