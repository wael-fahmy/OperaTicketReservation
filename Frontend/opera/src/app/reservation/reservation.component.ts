import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
const BACKEND_URL = environment.apiUrl;

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  eventId: number;
  hallId: number;
  serverError: boolean;
  errorCode: string;
  isLoading = false;
  Array2D;
  rows;
  columns;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  reserveSeat(index) {
    const user = localStorage.getItem('user');
    const ID = JSON.parse(user).ID;
    const seatRow = Math.floor(index / this.rows);
    const seatCol = index % this.rows;
    this.isLoading = true;
    this.http.post<any>(BACKEND_URL + '/Reservations/Create', { Event_ID: this.eventId, UserID: ID, Seat_Row: seatRow, Seat_Col: seatCol })
      .subscribe((response: any) => {
        this.serverError = false;
        this.errorCode = '';
        location.reload();
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

  ngOnInit() {
    this.serverError = false;
    this.errorCode = '';
    // tslint:disable-next-line: radix
    this.eventId = parseInt(this.route.snapshot.paramMap.get('eventId'));
    // tslint:disable-next-line: radix
    this.hallId = parseInt(this.route.snapshot.paramMap.get('hallId'));

    this.http.post<any>(BACKEND_URL + '/Events/Info', { eventId: this.eventId, hallId: this.hallId })
      .subscribe((response: any) => {
        // response is 2D
        this.Array2D = response;
        this.columns = this.Array2D.length;
        this.rows = this.Array2D[0].length;
        this.Array2D = this.Array2D.reduce((acc, val) => {
          acc = acc.concat(val);
          return acc;
        }, []);
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
