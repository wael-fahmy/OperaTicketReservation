import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
const BACKEND_URL = environment.apiUrl;

export interface Event {
  ID: number;
  Event_Name: string;
  Event_Description: string;
  Event_Poster: string;
  Event_DateTime: string;
  Hall_Number: number;
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  serverError: boolean;
  errorCode: string;
  isLoading = false;
  eventsList: Event[] = [];
  isCustomer = false;
  isManager = false;
  thereAreEvents = false;
  constructor(private router: Router, private http: HttpClient) { }

  reserve(eventID: number) {
    this.router.navigate(['reservation', eventID]);
  }

  ngOnInit() {
    this.isLoading = true;
    const date = new Date();
    const user = localStorage.getItem('user');
    if (user) {
      this.isCustomer = JSON.parse(user).Title === 'Customer' ? true : false;
      this.isManager = JSON.parse(user).Title === 'Opera_Management' ? true : false;
    } else {
      this.isCustomer = false;
      this.isManager = false;
    }
    this.http.post<any>(BACKEND_URL + '/Events/get', null)
      .subscribe((serverResponse: any) => {
        this.eventsList = serverResponse;
        this.thereAreEvents = serverResponse.length === 0 ? false : true;
        this.serverError = false;
        this.errorCode = '';
        this.isLoading = false;
      }, error => {
        console.log(error);
        this.errorCode = 'A0100112000';
        this.serverError = true;
        this.isLoading = false;
      });
    // // TODO: Get all events from backend
    // this.eventsList = [
    //   {
    //     ID: 1,
    //     Event_Name: 'Ta5arog CCEC 2020',
    //     Event_Description  : 'A7la Event dah wla eh',
    //     Event_Poster: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    //     Event_DateTime : date.toISOString(),
    //     Hall_Number: 1
    //   },
    //   {
    //     ID: 2,
    //     Event_Name: 'Ta5arog CCEE 2020',
    //     Event_Description  : 'A7la Event dah wla eh',
    //     Event_Poster: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    //     Event_DateTime : date.toISOString(),
    //     Hall_Number: 4
    //   },
    // ];
  }

}
