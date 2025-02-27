import { UserService } from './../../../../../core/services/user-service';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Recruiter } from 'src/app/Front-End/core/models/user.model';

@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.css'],
})
export class RecruiterComponent {
  @Input() recruiters: Recruiter[] = [];
  public errorMessage: string | null = null;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.fetchRecruiters();
  }

  goToRecruiterDetails(recruiter: Recruiter) {
    if (!recruiter || !recruiter._id) {
      console.error('Universtiy ID is missing or invalid');
      return;
    }
    this.router.navigateByUrl(
      `talent-page/admin/recruiter-details/${recruiter._id}`
    );
  }

  get hasRecruiters(): boolean {
    return this.recruiters.length > 0;
  }

  fetchRecruiters() {
    this.userService.getAllRecruiters().subscribe(
      (data: Recruiter[]) => {
        this.recruiters = data;
      },
      (error) => {
        console.error('Error fetching projects:', error);
        this.errorMessage = 'Failed to load job posts. Please try again later.';
      }
    );
  }

  goToUserData(){
    this.router.navigateByUrl('talent-page/admin/user-data');
  }
}
