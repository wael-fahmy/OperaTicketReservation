import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  serverError: boolean;
  errorCode: string;

  private serverErrorSubscription: Subscription;
  private errorCodeSubscription: Subscription;

  // For attendance
  userID: number;
  private userIDSubs: Subscription;

  // Is user signed in?
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  // What is the user's authority
  userAuthority = '';
  private authTypeSubs: Subscription;

  // Types to show HTML accordingly
  admin = false;
  manager = false;
  customer = false;

  // Is the main component loading?
  isLoading = false;

  private mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private authService: AuthService, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  ngOnInit() {
    try { // Show side nav options according to authority
      const user = localStorage.getItem('user');
      const title = JSON.parse(user).Title;
      this.setTypeBooleans(title);
    } catch (error) {
      this.setTypeBooleans('');
    }

    try {
      // tslint:disable-next-line: radix
      const user = localStorage.getItem('user');
      this.userID = JSON.parse(user).ID;
    } catch (error) {
      this.userID = null;
    }

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });

    this.userAuthority = this.authService.getAuthority();
    this.authTypeSubs = this.authService.getAuthAuthorityListener()
      .subscribe(userAuthorityResponse => {
        this.userAuthority = userAuthorityResponse.toString();
        this.setTypeBooleans(this.userAuthority);
      });

    // tslint:disable-next-line: radix
    this.userID = parseInt(this.authService.getUserID());
    this.userIDSubs = this.authService.getUserIDListener()
      .subscribe(userIDResponse => {
        // tslint:disable-next-line: radix
        this.userID = parseInt(userIDResponse);
      });
  }

  signout() {
    this.isLoading = true;

    this.authService.signout();

    setTimeout(() => { this.isLoading = false; }, 1000);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoading = false;
      }
      if (event instanceof NavigationError) {
        this.isLoading = false;
        console.log(event.error);
      }
    });

    this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isLoading = false;
      });

    this.errorCodeSubscription = this.authService.getErrorCodeLogoutListener()
      .subscribe((errorCodeLogoutResponse: string) => {
        this.errorCode = errorCodeLogoutResponse;
        this.serverErrorSubscription = this.authService.getServerErrorLogoutListener()
          .subscribe((serverErrorLogoutResponse: boolean) => {
            if (this.errorCode === 'A01001002000') {
              this.serverError = serverErrorLogoutResponse;
            } else {
              this.serverError = false;
            }
          });
      });
  }

  setTypeBooleans(type: string): void {
    switch (type) {
      case 'Site_Administrator': // admin
        this.manager = false;
        this.admin = true;
        this.customer = false;
        break;
      case 'Opera_Management': // Manager
        this.manager = true;
        this.admin = false;
        this.customer = false;
        break;
      case 'Customer': // Customer
        this.manager = false;
        this.admin = false;
        this.customer = true;
        break;
      default: // All False
        this.manager = false;
        this.admin = false;
        this.customer = false;
        break;
    }
  }

  ngOnDestroy(): void {
    try { this.mobileQuery.removeEventListener('change', this.mobileQueryListener); } catch (error) { }
    try { this.authListenerSubs.unsubscribe(); } catch (error) { }
    try { this.authTypeSubs.unsubscribe(); } catch (error) { }
    try { this.serverErrorSubscription.unsubscribe(); } catch (error) { }
  }
}
