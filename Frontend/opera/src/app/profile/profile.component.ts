import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

export interface UserModel {
  userID: number;
  username: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  city: string;
  address: string;
  email: string;
  authority: number;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  serverError: boolean;
  errorCode: string;
  // Is the page loading?
  isLoading = true;
  // Was there an user with this ID
  isThereUser: boolean;
  // The User ID in the URL
  snapshotParam: number;
  // The User ID in the localStorage
  currentUserID: number;
  // Can I go back?
  enableBack: boolean;
  // Enable edit if this profile is mine
  enableEdit: boolean;
  // View Mode (view only without editing)
  viewMode = true;
  // Model to carry data
  userData: UserModel;

  constructor(private router: Router, private route: ActivatedRoute, private profileService: ProfileService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
  }

  backButton() {
    if (!this.enableBack) {
      return;
    }
    window.history.back();
  }

  edit() {
    this.isLoading = true;
    this.viewMode = true;
    this.isThereUser = false;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  save() {
    this.isLoading = true;
    this.viewMode = true;
    this.isThereUser = false;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
    this.ngOnInit();
  }

  ngOnInit() {
    this.enableBack = (window.history.length === 1) ? false : true;
    this.isLoading = true;
    this.viewMode = true;
    this.isThereUser = false;
    // tslint:disable-next-line: radix
    this.snapshotParam = parseInt(this.route.snapshot.paramMap.get('uid'));
    // tslint:disable-next-line: radix
    try {
      // tslint:disable-next-line: radix
      this.currentUserID = parseInt(localStorage.getItem('userID'));
      this.enableEdit = (this.snapshotParam === this.currentUserID) ? true : false;
    } catch (error) {
      this.enableEdit = false;
    }
    // tslint:disable-next-line: radix
    this.profileService.getUserDetails(this.snapshotParam)
      .subscribe((userDataReceived: UserModel) => {
        this.isThereUser = (!userDataReceived.email) ? false : true;

        this.userData = userDataReceived;

        this.serverError = false;
        this.errorCode = '';
        this.isLoading = false;
      }, error => {
        console.log(error);
        if (error.error.responseHexCode) {
          this.errorCode = error.error.responseHexCode + ' - ' + error.error.responseMsg;
        } else {
          // Can't Reach Server
          this.errorCode = 'A01001041000';
        }
        this.serverError = true;
        this.isLoading = false;
      });
  }
}
