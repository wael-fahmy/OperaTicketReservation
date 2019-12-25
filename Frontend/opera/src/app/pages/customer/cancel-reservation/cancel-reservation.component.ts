import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
const BACKEND_URL = environment.apiUrl;

export interface Reservation {
  ID: number;
  Event_ID: number;
  UserID: number;
  Seat_Row: number;
  Seat_Col: number;
  Paid: boolean;
}

@Component({
  selector: 'app-cancel-reservation',
  templateUrl: './cancel-reservation.component.html',
  styleUrls: ['./cancel-reservation.component.css']
})
export class CancelReservationComponent implements OnInit {
  serverError: boolean;
  errorCode: string;
  isEnglish: boolean;
  thereAreUsers = false;
  isLoading = true;
  selected = '-1';

  private reservationDetails: Reservation[] = [];

  displayedColumns: string[] = [
    'ID', 'Event_ID', 'Seat_Row', 'Seat_Col', 'Paid', 'action'
  ];

  dataSource: MatTableDataSource<Reservation>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router, private snackBar: MatSnackBar, private http: HttpClient) { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cancelReservation(Id: number) {
    this.isLoading = true;
    // tslint:disable-next-line: radix
    this.http.post(BACKEND_URL + '/Reservations/delete', { Id })
      .subscribe((response: any) => {
        this.snackBar.open('Canceled event with ID: ' + Id.toString(), null, {
          duration: 2000,
        });
        this.serverError = false;
        this.errorCode = '';
        this.ngOnInit();
      }, error => {
        console.log(error);
        this.errorCode = 'A01001032000';
        this.serverError = true;
        this.isLoading = false;
      });
  }

  ngOnInit() {
    this.isLoading = true;
    this.thereAreUsers = false;

    this.http.post<any>(BACKEND_URL + '/Reservations/get/userId', null)
      .subscribe((reservationDataReceived: any) => {
        this.reservationDetails = reservationDataReceived[0];
        const user = JSON.parse(localStorage.getItem('user'));
        const ID = user.ID;
        this.reservationDetails = this.reservationDetails.filter((obj) => {
          return obj.ID !== ID;
        });
        this.thereAreUsers = (this.reservationDetails.length === 0) ? false : true;

        this.dataSource = new MatTableDataSource(this.reservationDetails);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.sort.disableClear = true;

        this.serverError = false;
        this.errorCode = '';

        this.isLoading = false;
      }, error => {
        console.log(error);
        this.errorCode = 'A01001031000';
        this.serverError = true;
        this.isLoading = false;
      });
  }
}
