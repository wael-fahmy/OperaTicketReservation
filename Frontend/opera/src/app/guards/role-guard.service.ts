import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const authority = route.data.authority as string;
    let authorityCheck = '';
    try {
      authorityCheck = this.authService.getAuthority().toString();
    } catch (error) {
      authorityCheck = '';
    }
    // if (authority === '-1') {
    //   switch (authorityCheck) {
    //     case '1': // Manager
    //       this.router.navigate(['/']);
    //       break;
    //     case '0': // admin
    //       this.router.navigate(['/']);
    //       break;
    //     default:
    //       this.router.navigate(['/']);
    //       break;
    //   }
    // } else if (authorityCheck !== authority) {
    //   this.router.navigate(['/']);
    // }
    if (authorityCheck !== authority) {
      this.router.navigate(['/']);
    }
    return true;
  }
}
