import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData, SignUpData, SignInResponse, ServerResponse } from './auth-data.model';
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
  private token: string;
  private tokenTimer: any;
  private userID: string;
  private authority: string;
  dialogRef: MatDialogRef<ErrorComponent>;
  serverErrorLogin: boolean;
  serverErrorLogout: boolean;
  serverErrorSignUp: boolean;
  errorCodeLogin: string;
  errorCodeLogout: string;
  errorCodeSignUp: string;

  // Is the user authenticated or not
  private authStatusListener = new Subject<boolean>();

  // Type of user
  private authAuthorityListener = new Subject<string>();

  // User ID
  private userIDListener = new Subject<string>();

  // To get success messages in component
  private signinUpdated = new Subject<SignInResponse>();

  // To get success messages in component
  private signupUpdated = new Subject<ServerResponse>();

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

  getToken() {
    return this.token;
  }

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

  allCountries() {
    return this.http.get('assets/countries.json');
  }

  signup(user: SignUpData) {
    const authData: SignUpData = user;
    return this.http.post<ServerResponse>(BACKEND_URL + '/signup', authData)
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
        if (error.error.responseHexCode) {
          this.errorCodeSignUp = error.error.responseHexCode + ' - ' + error.error.responseMsg;
          this.errorCodeSignUpListener.next(error.error.responseHexCode);
          this.serverErrorSignUp = true;
          this.serverErrorSignUpListener.next(true);
        } else {
          // Can't Reach Server
          this.errorCodeSignUp = 'A01001003000';
          this.errorCodeSignUpListener.next('A01001003000');
          this.serverErrorSignUp = true;
          this.serverErrorSignUpListener.next(true);
        }
        this.authStatusListener.next(false);
        this.authAuthorityListener.next('');
        this.userIDListener.next('');
      }
      );
  }

  // TODO: Add token expiration
  signin(email: string, password: string) {
    const authData: LoginData = { email, password };
    return this.http.post<SignInResponse>(BACKEND_URL + '/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token && response.responseHexCode === '00') {
          // const expiresInDuration = response.expiresIn;
          // this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authority = response.authority;
          this.userID = response.userID;
          this.authStatusListener.next(true);
          this.authAuthorityListener.next(response.authority);
          this.userIDListener.next(response.userID);

          this.serverErrorLogin = false;
          this.serverErrorLoginListener.next(false);
          this.errorCodeLogin = '';
          this.errorCodeLoginListener.next('');
          // const now = new Date();
          // const expirationDate = new Date(
          //   now.getTime() + expiresInDuration * 1000
          // );
          // console.log(expirationDate);
          // this.saveAuthData(token, expirationDate, this.userID);
          this.saveAuthData(token, this.authority, this.userID);
          this.router.navigate(['/']);
        }
      }, error => {
        console.log(error);
        if (error.error.responseHexCode) {
          this.serverErrorLogin = true;
          this.serverErrorLoginListener.next(true);
          this.errorCodeLogin = error.error.responseHexCode + ' - ' + error.error.responseMsg;
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

  // TODO: Send token instead of dummyTokn
  signout() {
    let token = '';
    try {
      token = localStorage.getItem('token');
    } catch (error) {
      this.isAuthenticated = false;
      this.authority = '';
      this.userID = '';
      this.authStatusListener.next(false);
      this.authAuthorityListener.next('');
      this.userIDListener.next('');
      clearTimeout(this.tokenTimer);
      this.clearAuthData();
      this.router.navigate(['/']);
      return;
    }
    this.http.post<ServerResponse>(BACKEND_URL + '/logout', { userID: token })
      .subscribe(response => {
        if (response.responseHexCode === '00') {
          this.isAuthenticated = false;
          this.authority = '';
          this.userID = '';
          this.authStatusListener.next(false);
          this.authAuthorityListener.next('');
          this.userIDListener.next('');
          clearTimeout(this.tokenTimer);
          this.clearAuthData();

          this.serverErrorLogout = false;
          this.serverErrorLogoutListener.next(false);
          this.errorCodeLogout = '';
          this.errorCodeLogoutListener.next('');
          this.router.navigate(['/']);
          return;
        }
      }, error => {
        console.log(error);
        if (error.error.responseHexCode) {
          this.errorCodeLogout = error.error.responseHexCode + ' - ' + error.error.responseMsg;
          this.errorCodeLogoutListener.next(this.errorCodeLogout);
          this.serverErrorLogout = true;
          this.serverErrorLogoutListener.next(true);
        } else {
          // Can't Reach Server
          this.errorCodeLogout = 'A01001002000';
          this.errorCodeLogoutListener.next('A01001002000');
          this.serverErrorLogout = true;
          this.serverErrorLogoutListener.next(true);
        }

        switch (error.error.responseHexCode) {
          case '01':  // User already logged out
          case '02':  //
          case 'FC':  // Catch Block
          case 'FD':  //
          case 'FE':  //
          case 'FF':  // Not Found
            this.isAuthenticated = false;
            this.authority = '';
            this.userID = '';
            this.authStatusListener.next(false);
            this.authAuthorityListener.next('');
            this.userIDListener.next('');
            clearTimeout(this.tokenTimer);
            this.clearAuthData();

            this.serverErrorLogout = false;
            this.serverErrorLogoutListener.next(false);
            this.errorCodeLogout = '';
            this.errorCodeLogoutListener.next('');
            this.router.navigate(['/']);
            return;
          default:
            break;
        }
        // 404
        this.authStatusListener.next(true);
        this.authAuthorityListener.next(localStorage.getItem('authority'));
        this.userIDListener.next(localStorage.getItem('userID'));
      }
      );
  }

  signoutOnError() {
    this.isAuthenticated = false;
    this.authority = '';
    this.userID = '';
    this.authStatusListener.next(false);
    this.authAuthorityListener.next('');
    this.userIDListener.next('');
    clearTimeout(this.tokenTimer);
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
    const expiresIn = 1;
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.authority = authInformation.authority;
      this.userID = authInformation.userID;
      // this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
      this.authAuthorityListener.next(this.authority.toString());
      this.userIDListener.next(this.userID.toString());
    }
  }

  // Save user data to local storage
  private saveAuthData(token: string, authority: string, userID: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('authority', authority);
    localStorage.setItem('userID', userID);
  }

  // Remove user data from local storage
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('authority');
    localStorage.removeItem('userID');
  }

  // Get user data from local storage
  private getAuthData() {
    const token = localStorage.getItem('token');
    let authority = '';
    let userID = '';
    try {
      authority = localStorage.getItem('authority').toString();
      userID = localStorage.getItem('userID').toString();
    } catch (error) {
      authority = '';
      userID = '';
    }
    if (!token || !authority || !userID) {
      return;
    }
    return {
      token,
      authority,
      userID,
    };
  }
}
