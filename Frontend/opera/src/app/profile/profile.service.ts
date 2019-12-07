import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl;

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

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  getUserDetails(sentID: number) {
    return this.http.post<UserModel>(BACKEND_URL + '/user/getDatabyUserID', { sentID });
  }

  constructor(private http: HttpClient) { }
}
