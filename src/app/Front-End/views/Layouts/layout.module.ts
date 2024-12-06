import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TalentSidebarComponent } from './talent-sidebar/talent-sidebar.component';
import { RouterModule } from '@angular/router';
import { TalentHeaderComponent } from './talent-header/talent-header.component';


@NgModule({
  declarations: [
    TalentSidebarComponent,
    TalentHeaderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule 
  ],
 exports: [
    TalentSidebarComponent,
    TalentHeaderComponent
  ],
  providers: [DatePipe],
})
export class LayoutModule { }
