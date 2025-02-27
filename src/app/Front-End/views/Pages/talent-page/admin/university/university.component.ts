import { Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { University, UniversityResponse } from 'src/app/Front-End/core/models/university.model';
import { AdminService } from 'src/app/Front-End/core/services/admin.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Folder } from 'src/app/Front-End/core/enums/folder-name.enum';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';



@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})
export class UniversityComponent implements OnInit  {

  @Input() universities: University[] = [];
  public totalUniversities!:any
  isViewMode: boolean = true;
  public errorMessage: string | null = null;
  uploadedFileData: { fileName: string; url: string; filePath: string } | null = null;


  constructor(private router: Router, private adminService: AdminService, private storage: AngularFireStorage, private sanitizer: DomSanitizer
  ){}

  ngOnInit() {
    this.fetchUniversities();
  }

  goToUniversityDetails(university:University) {
    if (!university || !university._id) {
      console.error('Universtiy ID is missing or invalid');
      return;
    }
      this.router.navigateByUrl(`talent-page/admin/university-details/${university._id}`)
  }

  onUniversityDeleted(id: string) {
    this.universities = this.universities.filter(university => university._id !== id);
  }


  deleteUniversityById(id: string, filePath: string) {
    if (!id) {
      console.error("University ID is missing or invalid.");
      return;
    }

    const confirmDelete = confirm("Are you sure you want to delete this university?");
    if (!confirmDelete) return;
    const originalUniversities = [...this.universities];
    this.universities = this.universities.filter(university => university._id !== id);
    this.adminService.deleteUniversityById(id).subscribe(
      () => {
        console.log("University deleted successfully!");
        if (filePath) {
          this.deleteUniversityLogo(filePath);
        }
      },
      (error) => {
        console.error("Error deleting university:", error);
        alert("Failed to delete the university. Please try again.");
        this.universities = originalUniversities;
      }
    );
  }

  deleteUniversityLogo(filePath: string): void {
    if (!filePath) {
      console.error("No file path provided for deletion.");
      return;
    }
    const correctedFilePath = `${Folder.Main_Folder}/${Folder.Admin_Folder}/${Folder.Admin_Sub_Folder_2}/${filePath}`;
    this.storage.ref(correctedFilePath).delete().subscribe({
      next: () => {
        console.log("University logo deleted successfully from Firebase Storage");
      },
      error: (error) => {
        console.error("Error deleting university logo from Firebase Storage:", error);
        alert("Failed to delete the university logo. Please try again.");
      }
    });
  }


  get hasUniversities(): boolean {
    return this.universities.length > 0;
  }



  fetchUniversities() {
    this.adminService.getAllUniversities().subscribe(
      (response: UniversityResponse) => {
        this.totalUniversities = response.totalUniversities; // Store total count
        this.universities = response.universities.map((university: University) => ({
          ...university,
          universityDetails: {
            ...university.universityDetails,
            sanitizedUniversityDescription: this.sanitizeHtml(university.universityDetails.universityDescription) // Assign inside universityDetails
          }
        }));
      },
      (error) => {
        console.error('Error fetching universities:', error);
        this.errorMessage = 'Failed to load universities. Please try again later.';
      }
    );
  }



  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }




// Common method to check file extension
private hasValidExtension(url: string, validExtensions: string[]): boolean {
  const ext = url.split('?')[0].toLowerCase();
  const extension = ext.split('.').pop() || '';
  return validExtensions.includes(extension);
}

isImage(url: string): boolean {
  return this.hasValidExtension(url, ['jpg', 'jpeg', 'png', 'gif', 'webp']);
}

isVideo(url: string): boolean {
  return this.hasValidExtension(url, ['mp4', 'webm', 'ogg']);
}

isAudio(url: string): boolean {
  return this.hasValidExtension(url, ['mp3']);
}

isPDF(url: string): boolean {
  return this.hasValidExtension(url, ['pdf']);
}

getFileExtension(url: string): string {
  const ext = url.split('?')[0].toLowerCase();
  return ext.split('.').pop() || 'unknown';
}

 private handleError(error: any, action: string) {
    console.error(`Error ${action}:`, error);
    alert(`Failed to ${action}. Please try again later.`);
  }


  goToUniversityPost(): void {
    this.router.navigateByUrl('talent-page/admin/university-post-form');
  }

  goToUniversityEdit(university:University): void {
    if (!university || !university._id) {
      console.error('Universtiy ID is missing or invalid');
      return;
    }
    this.router.navigateByUrl(`talent-page/admin/university-edit-form/${university._id}`);
  }



  goToDashboard(){
    this.router.navigateByUrl('talent-page/admin/dashboard');
  }





}
