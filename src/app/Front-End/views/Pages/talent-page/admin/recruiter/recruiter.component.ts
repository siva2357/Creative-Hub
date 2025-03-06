import { UserService } from './../../../../../core/services/user-service';
import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Recruiter } from 'src/app/Front-End/core/models/user.model';

@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.css'],
})
export class RecruiterComponent {
  public recruiters: Recruiter[] = [];
  public errorMessage: string | null = null;
  public totalRecruiters! :number;

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
      (data) => {
        // data now contains two properties: totalRecruiters and recruiters
        console.log('Recruiters data:', data);
        // Optionally store the total count
        this.totalRecruiters = data.totalRecruiters;
        this.recruiters = data.recruiters;
      },
      (error) => {
        console.error('Error fetching recruiters:', error);
        this.errorMessage = 'Failed to load recruiters. Please try again later.';
      }
    );
  }


  goToUserData(){
    this.router.navigateByUrl('talent-page/admin/user-data');
  }
}
