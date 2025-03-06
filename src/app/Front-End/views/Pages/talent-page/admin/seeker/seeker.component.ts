import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Seeker } from 'src/app/Front-End/core/models/user.model';
import { UserService } from 'src/app/Front-End/core/services/user-service';

@Component({
  selector: 'app-seeker',
  templateUrl: './seeker.component.html',
  styleUrls: ['./seeker.component.css'],
})
export class SeekerComponent {
  public seekers: Seeker[] = [];
  public errorMessage: string | null = null;
  public totalSeekers!: number;
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.fetchSeekers();
  }

  goToSeekerDetails(seeker: Seeker) {
    if (!seeker || !seeker._id) {
      console.error('Universtiy ID is missing or invalid');
      return;
    }
    this.router.navigateByUrl(`talent-page/admin/seeker-details/${seeker._id}`);
  }

  get hasSeekers(): boolean {
    return this.seekers.length > 0;
  }



  fetchSeekers() {
    this.userService.getAllSeekers().subscribe(
      (data) => {
        // data now contains two properties: totalRecruiters and recruiters
        console.log('Seekers data:', data);
        // Optionally store the total count
        this.totalSeekers = data.totalSeekers;
        this.seekers = data.Seekers;
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
