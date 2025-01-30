import { Component, Input } from '@angular/core';
import { Seeker } from 'src/app/Front-End/core/models/user-registration.model';
import { AuthService } from 'src/app/Front-End/core/services/auth.service';

@Component({
  selector: 'app-seeker-basic-details',
  templateUrl: './seeker-basic-details.component.html',
  styleUrls: ['./seeker-basic-details.component.css']
})
export class SeekerBasicDetailsComponent {
  @Input() profileDetails!: Seeker;

  isSocialMedia:boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadProfileData();
  }

  loadProfileData() {
    const seekerId = localStorage.getItem('seekerId'); // Assuming seeker ID is stored during login
    if (seekerId) {
      this.authService.getSeekerById(seekerId).subscribe({
        next: (data: Seeker) => {
          this.profileDetails = data; // Bind data to the component
        },
        error: (err) => {
          console.error('Error fetching seeker profile:', err);
        },
      });
    }
  }

}
