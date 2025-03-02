import { Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Front-End/core/services/admin.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Folder } from 'src/app/Front-End/core/enums/folder-name.enum';
import { Company,CompanyResponse } from 'src/app/Front-End/core/models/company.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit{

  @Input() companies: Company[] = [];
  public totalCompanies!:any
  isViewMode: boolean = true;
  public errorMessage: string | null = null;
  uploadedFileData: { fileName: string; url: string; filePath: string } | null = null;


  constructor(private router: Router, private adminService: AdminService, private storage: AngularFireStorage,private sanitizer: DomSanitizer
  ){}

  ngOnInit() {
    this.fetchCompanies();
  }

  goToCompanyDetails(company:Company) {
    if (!company || !company._id) {
      console.error('Universtiy ID is missing or invalid');
      return;
    }
      this.router.navigateByUrl(`talent-page/admin/company-details/${company._id}`)
  }




  deleteCompanyById(id: string, filePath: string) {
    if (!id) {
      console.error("University ID is missing or invalid.");
      return;
    }

    const confirmDelete = confirm("Are you sure you want to delete this university?");
    if (!confirmDelete) return;
    const originalCompanies = [...this.companies];
    this.companies = this.companies.filter(company => company._id !== id);
    this.adminService.deleteCompanyById(id).subscribe(
      () => {
        console.log("Company deleted successfully!");
        if (filePath) {
          this.deleteCompanyLogo(filePath);
        }
      },
      (error) => {
        console.error("Error deleting university:", error);
        alert("Failed to delete the university. Please try again.");
        this.companies = originalCompanies;
      }
    );
  }

  deleteCompanyLogo(filePath: string): void {
    if (!filePath) {
      console.error("No file path provided for deletion.");
      return;
    }
    const correctedFilePath = `${Folder.Main_Folder}/${Folder.Admin_Folder}/${Folder.Admin_Sub_Folder_3}/${filePath}`;
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


  get hasCompanies(): boolean {
    return this.companies.length > 0;
  }



  fetchCompanies() {
    this.adminService.getAllCompanies().subscribe(
      (response: CompanyResponse) => {
        this.totalCompanies = response.totalCompanies; // Store total count
        this.companies = response.companies.map((company: Company) => ({
          ...company,
          companyDetails: {
            ...company.companyDetails,
            sanitizedCompanyDescription: this.sanitizeHtml(company.companyDetails.companyDescription) // Assign inside universityDetails
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


  goToCompanyPost(): void {
    this.router.navigateByUrl('talent-page/admin/company-post-form');
  }

  goToCompanyEdit(company:Company): void {
    if (!company || !company._id) {
      console.error('Universtiy ID is missing or invalid');
      return;
    }
    this.router.navigateByUrl(`talent-page/admin/company-edit-form/${company._id}`);
  }

  goToDashboard(){
    this.router.navigateByUrl('talent-page/admin/dashboard');
  }




}
