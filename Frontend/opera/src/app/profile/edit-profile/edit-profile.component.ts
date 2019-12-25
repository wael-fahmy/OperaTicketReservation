import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorComponent } from 'src/app/error/error.component';
import { environment } from '../../../environments/environment';
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
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  snapshotParam: number;
  userData: User;
  serverError: boolean;
  errorCode: string;
  isLoading = false;
  hide = true;
  date = new Date();
  minDate = new Date(1940, 0, 1);
  maxDate = new Date(this.date.getFullYear() - 18, this.date.getMonth(), this.date.getDate());
  gender = '';
  cityArray = [
    '10th of Ramadan City',
    '6th of October City',
    'Abu Kabir',
    'Akhmim',
    'Al-Hamidiyya',
    'al-Mansura',
    'al-Minya',
    'Alexandria',
    'Arish',
    'Aswan',
    'Asyut',
    'Banha',
    'Beni Suef',
    'Bilbais',
    'Cairo',
    'Damanhur',
    'Damietta',
    'Desouk',
    'El-Mahalla El-Kubra',
    'Fayyum',
    'Girga',
    'Gizeh',
    'Hurghada',
    'Idfu',
    'Ismailia',
    'Kafr el-Dawwar',
    'Kafr el-Sheikh',
    'Luxor',
    'Mallawi',
    'Marsa Matruh',
    'Matareya',
    'Mit Ghamr',
    'Port Said',
    'Qalyub',
    'Qena',
    'Shibin El Kom',
    'Shubra El-Kheima',
    'Sohag',
    'Suez',
    'Tanta',
    'Zagazig'
  ];
  // Form
  form: FormGroup;
  form2: FormGroup;

  dialogRef: MatDialogRef<ErrorComponent>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  editProfile() {
    if (this.form.invalid || this.findInvalidControls()) {
      if (this.dialog.openDialogs.length === 0) {
        this.dialogRef =
          this.dialog.open(ErrorComponent, { data: { message: 'Resolve invalid inputs before submiting' }, panelClass: 'my-dialog' });
      }
      return;
    }
    this.isLoading = true;
    const formJSON = this.form.getRawValue();
    formJSON.ID = this.snapshotParam;
    this.http.post<any>(BACKEND_URL + '/Users/UpdateUserInfo', formJSON)
      .subscribe((response: any) => {
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

  editPassword() {
    if (this.form2.invalid || this.findInvalidControls2()) {
      if (this.dialog.openDialogs.length === 0) {
        this.dialogRef =
          this.dialog.open(ErrorComponent, { data: { message: 'Resolve invalid inputs before submiting' }, panelClass: 'my-dialog' });
      }
      return;
    }
    this.isLoading = true;
    const formJSON = this.form2.getRawValue();
    formJSON.ID = this.snapshotParam;
    this.http.post<any>(BACKEND_URL + '/Users/UpdateUserPassword', formJSON)
      .subscribe((response: any) => {
        this.serverError = false;
        this.errorCode = '';
        this.isLoading = false;
        location.reload();
      }, error => {
        console.log(error);
        if (error.error.Message) {
          this.errorCode = error.error.Message;
        } else {
          // Can't Reach Server
          this.errorCode = 'A01001041000';
        }
        this.serverError = true;
        this.isLoading = false;
      });
  }

  findInvalidControls() {
    for (const name in this.form.controls) {
      if (this.form.controls[name].invalid) {
        return true;
      }
    }
    return false;
  }

  findInvalidControls2() {
    for (const name in this.form2.controls) {
      if (this.form2.controls[name].invalid) {
        return true;
      }
    }
    return false;
  }

  onCalendarKeydown(event) {
    return !event;
  }

  onKeydown(event) {
    if ((event.keyCode >= 8 && event.keyCode <= 46 && event.keyCode !== 32) || (event.keyCode >= 96 && event.keyCode <= 105)) {
      return;
    }

    if (event.keyCode > 31 && (event.keyCode < 48 || event.keyCode > 57)) {
      this.snackBar.open('You can enter only numbers', null, {
        duration: 2500,
      });
      return !event;
    }
    this.snackBar.dismiss();
  }

  ngOnInit() {
    this.serverError = false;
    this.errorCode = '';
    // tslint:disable-next-line: radix
    this.snapshotParam = parseInt(this.route.snapshot.paramMap.get('uid'));
    this.http.post<any>(BACKEND_URL + '/Users/GetUserByID', { ID: this.snapshotParam })
      .subscribe((userDataReceived: User) => {
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
    this.form2 = new FormGroup({
      User_Password: new FormControl(null, { validators: [Validators.required, Validators.minLength(8)] }),
    });

    this.form = new FormGroup({
      // tslint:disable-next-line: max-line-length
      First_Name: new FormControl(null, { validators: [Validators.required, Validators.pattern('[^0-9\.\?\!\@\#\$\%\^\&\*\(\)\<\>\{\}]+')] }),
      // tslint:disable-next-line: max-line-length
      Last_Name: new FormControl(null, { validators: [Validators.required, Validators.pattern('[^0-9\.\?\!\@\#\$\%\^\&\*\(\)\<\>\{\}]+')] }),
      Birth_Date: new FormControl(null, { validators: [Validators.required] }),
      Gender: new FormControl(null, { validators: [Validators.required] }),
      City: new FormControl(null, { validators: [Validators.required] }),
      User_Address: new FormControl(null),
    });
    setTimeout(() => {
      this.form.get('First_Name').setValue(this.userData.First_Name);
      this.form.get('Last_Name').setValue(this.userData.Last_Name);
      this.form.get('Birth_Date').setValue(this.userData.Birth_Date);
      this.form.get('Gender').setValue(this.userData.Gender);
      this.form.get('City').setValue(this.userData.City);
      this.form.get('User_Address').setValue(this.userData.User_Address);
    }, 1000);
  }
}
