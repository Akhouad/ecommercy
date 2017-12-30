import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(public auth: AuthService, protected router: Router) { }
    canActivate() {
      if (!this.auth.isAuthenticated()) {
          this.router.navigate(['/']);
          return false;
      }
      return true;
  }
}
