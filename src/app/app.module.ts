import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './Front-End/views/Layouts/app-header/app-header.component';
import { AppFooterComponent } from './Front-End/views/Layouts/app-footer/app-footer.component';

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
import { UnauthorizedPageComponent } from './Front-End/views/other-pages/unauthorized-page/unauthorized-page.component';
import { LayoutModule } from "./Front-End/views/Layouts/layout.module";
import { SharedModule } from './Front-End/views/shared/shared.module';
import { IntroductionLogoComponent } from './Front-End/views/Pages/introduction-logo/introduction-logo.component';
import { RecruiterSeekerProfileComponent } from './Front-End/views/Pages/talent-page/Recruiter/recruiter-seeker-profile/recruiter-seeker-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LearnPageComponent,
    ForDeveloperComponent,
    AboutPageComponent,
    BlogPageComponent,
    MarketPageComponent,
    PublishPageComponent,
    PurposePageComponent,
    AppHeaderComponent,
    AppFooterComponent,
    CloudPageComponent,
    UnauthorizedPageComponent,
    TalentMainPageComponent,
    TalentLoginComponent,
    TalentSignUpComponent,
    RegisterRecruiterComponent,
    RegisterSeekerComponent,
    IntroductionLogoComponent,
    RecruiterSeekerProfileComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    SharedModule
],
  providers: [ DatePipe ],
  bootstrap: [AppComponent]
})
export class AppModule { }
