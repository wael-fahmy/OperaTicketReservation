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
export class AttendanceGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authService.getIsAuth();
    if (!isAuth) {
      this.router.navigate(['/']);
      return !isAuth;
    }

    let authority;
    try {
      authority = localStorage.getItem('authority').toString();
    } catch (error) {
      this.router.navigate(['/']);
      return !isAuth;
    }

    let uid;
    try {
      uid = localStorage.getItem('userID').toString();
    } catch (error) {
      this.router.navigate(['/']);
      return !isAuth;
    }

    const snapshotParam = route.paramMap.get('uid');

    if (authority === '1' || authority === '0') {  // Manager and Admin can view all
      return isAuth;
    } else {            // Only I can view my attendance
      if (uid === snapshotParam) {
        return isAuth;
      } else {
        this.router.navigate(['/']);
        return !isAuth;
      }
    }
  }
}
