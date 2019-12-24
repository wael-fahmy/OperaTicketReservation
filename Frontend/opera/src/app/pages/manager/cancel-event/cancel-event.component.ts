import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
const BACKEND_URL = environment.apiUrl;

export interface Event {
  ID: number;
  Event_Name: string;
  Event_Description  : string;
  Event_Poster: string;
  Event_DateTime : string;
  Hall_Number: number;
}

@Component({
  selector: 'app-cancel-event',
  templateUrl: './cancel-event.component.html',
  styleUrls: ['./cancel-event.component.css']
})
export class CancelEventComponent implements OnInit {
  serverError: boolean;
  errorCode: string;
  isEnglish: boolean;
  thereAreEvents = false;
  isLoading = true;
  selected = '-1';

  private eventDetails: Event[] = [];

  displayedColumns: string[] = [
    'ID', 'Event_Name', 'Event_Description  ', 'Event_Poster', 'Event_DateTime ', 'Hall_Number', 'action'
  ];

  dataSource: MatTableDataSource<Event>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router, private snackBar: MatSnackBar, private http: HttpClient) { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cancelEvent(eventID: number) {
    this.isLoading = true;
    this.http.post(BACKEND_URL + 'event', eventID)
      .subscribe((response: any) => {
        this.snackBar.open('Canceled event with ID: ' + eventID.toString(), null, {
          duration: 2000,
        });
        this.serverError = false;
        this.errorCode = '';
        this.ngOnInit();
      }, error => {
        console.log(error);
        this.errorCode = 'A01001031000';
        this.serverError = true;
        this.isLoading = false;
      });
  }

  ngOnInit() {
    this.isLoading = true;
    this.thereAreEvents = false;

    this.http.post<any>(BACKEND_URL + '/events/getAllEvents', null)
      .subscribe((eventsDataReceived: Event[]) => {
        // TODO: Check Bellow Line
        this.eventDetails = eventsDataReceived;

        this.thereAreEvents = (this.eventDetails.length === 0) ? false : true;

        this.dataSource = new MatTableDataSource(this.eventDetails);
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
