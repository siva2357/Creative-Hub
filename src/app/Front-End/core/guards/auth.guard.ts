import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      const expectedRole = route.data?.['expectedRole'];
      const userRole = this.authService.getRole();

      if (expectedRole && userRole !== expectedRole) {
        // Redirect if the user does not have the expected role
        this.router.navigate(['/app/login']);
        return false;
      }

      return true; // User is logged in and has the correct role
    } else {
      this.router.navigate(['/app/login']);
      return false;
    }
  }
}
