import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';


import { MainPageComponent } from './Front-End/views/Pages/main-page/main-page.component';
import { LearnPageComponent } from './Front-End/views/Pages/learn-page/learn-page.component';
import { ForDeveloperComponent } from './Front-End/views/Pages/for-developer/for-developer.component';
import { AboutPageComponent } from './Front-End/views/Pages/about-page/about-page.component';
import { BlogPageComponent } from './Front-End/views/Pages/blog-page/blog-page.component';
import { MarketPageComponent } from './Front-End/views/Pages/market-page/market-page.component';
import { PublishPageComponent } from './Front-End/views/Pages/publish-page/publish-page.component';
import { PurposePageComponent } from './Front-End/views/Pages/purpose-page/purpose-page.component';
import { CloudPageComponent } from './Front-End/views/Pages/cloud-page/cloud-page.component';

import { TalentPageModule } from './Front-End/views/Pages/talent-page/talent-pages.module';

import { UnauthorizedPageComponent } from './Front-End/views/other-pages/unauthorized-page/unauthorized-page.component';
import { LayoutModule } from "./Front-End/views/Layouts/layout.module";
import { SharedModule } from './Front-End/views/shared/shared.module';
import { IntroductionLogoComponent } from './Front-End/views/Pages/introduction-logo/introduction-logo.component';


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
    CloudPageComponent,
    UnauthorizedPageComponent,
    IntroductionLogoComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    SharedModule,
    TalentPageModule,

],
  providers: [ DatePipe ],
  bootstrap: [AppComponent]
})
export class AppModule { }
