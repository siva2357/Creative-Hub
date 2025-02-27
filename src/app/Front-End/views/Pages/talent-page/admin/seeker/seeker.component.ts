import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Seeker } from 'src/app/Front-End/core/models/user.model';
import { UserService } from 'src/app/Front-End/core/services/user-service';

@Component({
  selector: 'app-seeker',
  templateUrl: './seeker.component.html',
  styleUrls: ['./seeker.component.css'],
})
export class SeekerComponent {
  @Input() seekers: Seeker[] = [];
  public errorMessage: string | null = null;

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
      (data: Seeker[]) => {
        this.seekers = data;
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
