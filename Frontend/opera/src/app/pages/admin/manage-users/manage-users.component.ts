import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
const BACKEND_URL = environment.apiUrl;

export interface User {
  ID: number;
  UserName: string;
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
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  serverError: boolean;
  errorCode: string;
  isEnglish: boolean;
  thereAreUsers = false;
  isLoading = true;
  selected = '-1';

  private userDetails: User[] = [];

  displayedColumns: string[] = [
    'ID', 'UserName', 'First_Name', 'Last_Name', 'Birth_Date', 'Gender', 'City', 'User_Address', 'Email', 'Title', 'actions'
  ];

  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router, private snackBar: MatSnackBar, private http: HttpClient) { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  verifyUser(ID: number) {
    this.isLoading = true;
    // tslint:disable-next-line: radix
    this.http.post(BACKEND_URL + '/Users/VerifyUser', { ID })
      .subscribe((response: any) => {
        this.snackBar.open('Verified user with ID: ' + ID.toString(), null, {
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

  // TODO:
  updateUser(ID: number, authority: number) {
    this.isLoading = true;
    this.http.post(BACKEND_URL + 'user', { ID, authority })
      .subscribe((response: any) => {
        this.snackBar.open('Updated user with ID: ' + ID.toString(), null, {
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

  removeUser(ID: number) {
    this.isLoading = true;
    this.http.post(BACKEND_URL + '/Users/DeleteUser', { ID })
      .subscribe((response: any) => {
        this.snackBar.open('Removed user with ID: ' + ID.toString(), null, {
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

    this.http.post<any>(BACKEND_URL + '/Users/getAllUsers', null)
      .subscribe((usersDataReceived: User[]) => {
        this.userDetails = usersDataReceived;

        this.thereAreUsers = (this.userDetails.length === 0) ? false : true;

        this.dataSource = new MatTableDataSource(this.userDetails);
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
