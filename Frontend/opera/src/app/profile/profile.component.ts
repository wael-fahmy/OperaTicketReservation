import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
const BACKEND_URL = environment.apiUrl;

export interface User {
  ID: number;
  UserName: string;
  User_Password: string;
  First_Name: string;
  Last_Name: string;
  Birth_Date: string;
  Gender: string;
  City: string;
  User_Address: string;
  Email: string;
  Title: string;
  Verified: boolean;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  serverError: boolean;
  errorCode: string;
  isLoading = true;
  isThereUser: boolean;
  snapshotParam: number;
  currentUserID: number;
  enableBack: boolean;
  enableEdit: boolean;
  viewMode = true;
  userData: User;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient,) {
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
      const user = localStorage.getItem('user');
      this.currentUserID = JSON.parse(user).ID;
      this.enableEdit = (this.snapshotParam === this.currentUserID) ? true : false;
    } catch (error) {
      this.enableEdit = false;
    }
    // tslint:disable-next-line: radix
    this.http.post<any>(BACKEND_URL + '/user/getUserByID', this.snapshotParam)
      .subscribe((userDataReceived: User) => {
        this.isThereUser = (!userDataReceived.Email) ? false : true;

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
