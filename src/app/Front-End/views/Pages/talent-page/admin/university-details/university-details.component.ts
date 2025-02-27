import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { University } from 'src/app/Front-End/core/models/university.model';
import { AdminService } from 'src/app/Front-End/core/services/admin.service';

@Component({
  selector: 'app-university-details',
  templateUrl: './university-details.component.html',
  styleUrls: ['./university-details.component.css']
})
export class UniversityDetailsComponent  implements OnInit{

  universityId!: string;
  university: University | null = null;
  errorMessage = '';
  constructor( private activatedRouter: ActivatedRoute, private adminService: AdminService, private router:Router,  private sanitizer: DomSanitizer ) {}

  ngOnInit(): void {

    this.activatedRouter.paramMap.subscribe((param) => {
      this.universityId = param.get('id')!;
      console.log('University ID:', this.universityId);

      if (this.universityId) {
        this.fetchUniversityDetails(this.universityId); // Call API only after ID is fetched
      }
    });
  }

  fetchUniversityDetails(id: string): void {
    this.adminService.getUniversityById(id).subscribe({
      next: (university) => {
        this.university = {
          ...university,
          universityDetails: {
            ...university.universityDetails,
            sanitizedUniversityDescription: this.sanitizeHtml(university.universityDetails.universityDescription) // Sanitize here
          }
        };
      },
      error: (err) => console.error('Error fetching university details:', err)
    });
  }



    sanitizeHtml(html: string): SafeHtml {
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }



  goBack(){
    this.router.navigate(['portfolio']);
  }
}
