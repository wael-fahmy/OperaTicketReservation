import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
const BACKEND_URL = environment.apiUrl;

@Component({
  selector: 'app-view-seats',
  templateUrl: './view-seats.component.html',
  styleUrls: ['./view-seats.component.css']
})
export class ViewSeatsComponent implements OnInit {
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
    private route: ActivatedRoute,
  ) { }

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
