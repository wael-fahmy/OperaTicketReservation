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
  enableEdit = true;
  editMode = false;
  userData: User;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {
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

  onCalendarKeydown(event) {
    return !event;
  }

  edit() {
    this.router.navigate(['edit-profile', this.snapshotParam]);
  }

  ngOnInit() {
    this.enableBack = (window.history.length === 1) ? false : true;
    this.isLoading = true;
    this.isThereUser = false;
    // tslint:disable-next-line: radix
    this.snapshotParam = parseInt(this.route.snapshot.paramMap.get('uid'));
    this.http.post<any>(BACKEND_URL + '/Users/GetUserByID', { ID: this.snapshotParam })
      .subscribe((userDataReceived: User) => {
        this.isThereUser = (!userDataReceived.Email) ? false : true;

        this.userData = userDataReceived;

        this.serverError = false;
        this.errorCode = '';
        this.isLoading = false;
      }, error => {
        console.log(error);
        if (error.error.message) {
          this.errorCode = error.error.message;
        } else {
          // Can't Reach Server
          this.errorCode = 'A01001041000';
        }
        this.serverError = true;
        this.isLoading = false;
      });
  }
}
