import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Folder } from 'src/app/Front-End/core/enums/folder-name.enum';
import { ProjectResponse, ProjectUpload } from 'src/app/Front-End/core/models/project-upload.model';
import { ProjectUploadService } from 'src/app/Front-End/core/services/projectUpload.service';

@Component({
  selector: 'app-seeker-manage-project',
  templateUrl: './seeker-manage-project.component.html',
  styleUrls: ['./seeker-manage-project.component.css']
})

export class SeekerManageProjectPageComponent implements OnInit{
 public seekerId!:string;
  public projects: ProjectUpload[] = [];
  public totalProjects!:any
  isViewMode: boolean = true;
  public errorMessage: string | null = null;
  uploadedFileData: { fileName: string; url: string; filePath: string } | null = null;


  constructor(private router: Router, private projectService: ProjectUploadService, private storage: AngularFireStorage,private sanitizer: DomSanitizer
  ){}



    ngOnInit() {
      this.seekerId = localStorage.getItem('userId') || '';

      console.log("User ID:", this.seekerId);

      if (this.seekerId) {
        this.fetchProjects();
      } else {
        this.errorMessage = 'Recruiter ID is missing. Please log in again.';
      }
    }

    get hasJobPosts(): boolean {
      return this.projects.length > 0;
    }




  goToProjectEdit(project:ProjectUpload) {
    if (!project || !project._id) {
      console.error('Universtiy ID is missing or invalid');
      return;
    }
      this.router.navigateByUrl(`talent-page/seeker/edit-project/${project._id}`)
  }





  deleteProjectById(projectId: string, filePath: string) {
    if (!projectId) {
      console.error("University ID is missing or invalid.");
      return;
    }

    const confirmDelete = confirm("Are you sure you want to delete this university?");
    if (!confirmDelete) return;
    const originalProjects = [...this.projects];
    this.projects = this.projects.filter(project => project._id !== projectId);
    this.projectService.deleteProjectById(this.seekerId,projectId).subscribe(
      () => {
        console.log("Company deleted successfully!");
        if (filePath) {
          this.deleteProjectFile(filePath);
        }
      },
      (error) => {
        console.error("Error deleting university:", error);
        alert("Failed to delete the university. Please try again.");
        this.projects = originalProjects;
      }
    );
  }

  deleteProjectFile(filePath: string): void {
    if (!filePath) {
      console.error("No file path provided for deletion.");
      return;
    }
    const correctedFilePath = `${Folder.Main_Folder}/${Folder.Seeker_Folder}/${Folder.Seeker_Sub_Folder_2}/${filePath}`;
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


  get hasProjects(): boolean {
    return this.projects.length > 0;
  }



  fetchProjects() {
    this.projectService.getProjects(this.seekerId).subscribe(
      (response: ProjectResponse) => {
        this.totalProjects = response.totalProjects; // Store total count
        this.projects = response.projects.map((project: ProjectUpload) => ({
          ...project,
          projectDetails: {
            ...project.projectDetails,
            sanitizedProjectDescription: this.sanitizeHtml(project.projectDetails.projectDescription) // Assign inside universityDetails
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



}
