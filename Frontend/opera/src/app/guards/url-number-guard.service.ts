import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  ActivatedRoute
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UrlNumberGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const snapshotInteger = route.data.snapshotInteger as string;

    const snapshotParam = route.paramMap.get(snapshotInteger);

    // tslint:disable-next-line: radix
    if (isNaN(parseInt(snapshotParam))) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
