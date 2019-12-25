import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData, SignUpData, SignInResponse } from './auth-data.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ErrorComponent } from '../error/error.component';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  authority: string;
  userID: string;
  dialogRef: MatDialogRef<ErrorComponent>;
  serverErrorLogin: boolean;
  serverErrorLogout: boolean;
  serverErrorSignUp: boolean;
  errorCodeLogin: string;
  errorCodeLogout: string;
  errorCodeSignUp: string;

  // Is the user authenticated or not
  private authStatusListener = new Subject<boolean>();
  private authAuthorityListener = new Subject<string>();
  private userIDListener = new Subject<string>();

  // To get success messages in component
  private signinUpdated = new Subject<SignInResponse>();

  // To get success messages in component
  private signupUpdated = new Subject<any>();

  // Login API can't reach the server
  private serverErrorLoginListener = new Subject<boolean>();
  private errorCodeLoginListener = new Subject<string>();

  // Logout API can't reach the server
  private serverErrorLogoutListener = new Subject<boolean>();
  private errorCodeLogoutListener = new Subject<string>();

  // SignUp API can't reach the server
  private serverErrorSignUpListener = new Subject<boolean>();
  private errorCodeSignUpListener = new Subject<string>();

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog) { }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthority() {
    return this.authority;
  }

  getUserID() {
    return this.userID;
  }

  getServerErrorLoginListener() {
    return this.serverErrorLoginListener.asObservable();
  }

  getErrorCodeLoginListener() {
    return this.errorCodeLoginListener.asObservable();
  }

  getServerErrorLogoutListener() {
    return this.serverErrorLogoutListener.asObservable();
  }

  getErrorCodeLogoutListener() {
    return this.errorCodeLogoutListener.asObservable();
  }

  getServerErrorSignUpListener() {
    return this.serverErrorSignUpListener.asObservable();
  }

  getErrorCodeSignUpListener() {
    return this.errorCodeSignUpListener.asObservable();
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getAuthAuthorityListener() {
    return this.authAuthorityListener.asObservable();
  }

  getUserIDListener() {
    return this.userIDListener.asObservable();
  }

  getSigninUpdated() {
    return this.signinUpdated.asObservable();
  }

  getSignupUpdated() {
    return this.signupUpdated.asObservable();
  }

  signup(user: SignUpData) {
    return this.http.post<any>(BACKEND_URL + '/Users/SignUp', user)
      .subscribe(response => {
        this.authStatusListener.next(false);
        this.authAuthorityListener.next('');
        this.userIDListener.next('');
        this.signupUpdated.next(response);

        this.errorCodeSignUp = '';
        this.errorCodeSignUpListener.next('');
        this.serverErrorSignUp = false;
        this.serverErrorSignUpListener.next(false);

        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.errorCodeSignUp = 'A01001003000';
        this.errorCodeSignUpListener.next('A01001003000');
        this.serverErrorSignUp = true;
        this.serverErrorSignUpListener.next(true);
        this.authStatusListener.next(false);
        this.authAuthorityListener.next('');
        this.userIDListener.next('');
      }
      );
  }

  signin(UserName: string, User_Password: string) {
    const authData: LoginData = { UserName, User_Password };
    return this.http.post<SignInResponse>(BACKEND_URL + '/Users/SignIn', authData)
      .subscribe(response => {
        delete response.user.User_Password;
        // const expiresInDuration = response.expiresIn;
        // this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.authority = response.user.Title;
        this.userID = response.user.ID.toString();
        this.authStatusListener.next(true);
        this.authAuthorityListener.next(response.user.Title);
        this.userIDListener.next(response.user.ID.toString());

        this.serverErrorLogin = false;
        this.serverErrorLoginListener.next(false);
        this.errorCodeLogin = '';
        this.errorCodeLoginListener.next('');
        this.saveAuthData(response.user);
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        if (error.error.message) {
          this.serverErrorLogin = true;
          this.serverErrorLoginListener.next(true);
          this.errorCodeLogin = error.error.message;
          this.errorCodeLoginListener.next(this.errorCodeLogin);
        } else {
          // Can't Reach Server
          this.serverErrorLogin = true;
          this.serverErrorLoginListener.next(true);
          this.errorCodeLogin = 'A01001001000';
          this.errorCodeLoginListener.next('A01001001000');
        }
        this.authStatusListener.next(false);
        this.authAuthorityListener.next('');
        this.userIDListener.next('');
      }
      );
  }

  signout() {
    let ID = '';
    try {
      const user = localStorage.getItem('user');
      ID = JSON.parse(user).ID;
    } catch (error) {
      this.isAuthenticated = false;
      this.authority = '';
      this.userID = '';
      this.authStatusListener.next(false);
      this.authAuthorityListener.next('');
      this.userIDListener.next('');
      this.clearAuthData();
      this.router.navigate(['/']);
      return;
    }
    this.isAuthenticated = false;
    this.authority = '';
    this.userID = '';
    this.authStatusListener.next(false);
    this.authAuthorityListener.next('');
    this.userIDListener.next('');
    this.clearAuthData();

    this.serverErrorLogout = false;
    this.serverErrorLogoutListener.next(false);
    this.errorCodeLogout = '';
    this.errorCodeLogoutListener.next('');
    this.router.navigate(['/']);
    return;
  }

  signoutOnError() {
    this.isAuthenticated = false;
    this.authority = '';
    this.userID = '';
    this.authStatusListener.next(false);
    this.authAuthorityListener.next('');
    this.userIDListener.next('');
    this.clearAuthData();
    this.router.navigate(['/']);
    return;
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    // const now = new Date();
    // const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    this.isAuthenticated = true;
    this.authority = authInformation.authority;
    this.userID = authInformation.userID;
    // this.setAuthTimer(expiresIn / 1000);
    this.authStatusListener.next(true);
    this.authAuthorityListener.next(this.authority.toString());
    this.userIDListener.next(this.userID.toString());
  }

  // Save user data to local storage
  private saveAuthData(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Remove user data from local storage
  private clearAuthData() {
    localStorage.removeItem('user');
  }

  // Get user data from local storage
  private getAuthData() {
    const user = localStorage.getItem('user');
    let authority = '';
    let userID = '';
    try {
      authority = JSON.parse(user).Title;
      userID = JSON.parse(user).ID.toString();
    } catch (error) {
      authority = '';
      userID = '';
    }
    if (!authority || !userID) {
      return;
    }
    return {
      authority,
      userID,
    };
  }
}
