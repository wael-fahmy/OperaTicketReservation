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
export class UrlGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const snapshotName = route.data.snapshotName as string;

    const snapshotParam = route.paramMap.get(snapshotName);

    const array = route.data.allowed as Array<string>;
    if (array.includes(snapshotParam)) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
