import { Component, OnInit } from '@angular/core';
import { ErrorComponent } from 'src/app/error/error.component';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DATE_LOCALE } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { mimeType } from './mime-type.validator';
const BACKEND_URL = environment.apiUrl;

@Component({
  selector: 'app-create-events',
  templateUrl: './create-events.component.html',
  styleUrls: ['./create-events.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class CreateEventsComponent implements OnInit {
  serverError: boolean;
  errorCode: string;
  isLoading = false;
  hallNumbersArray = [];
  selectedHallNumber;
  posterPreview;
  minDate = new Date();
  exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  form: FormGroup;

  dialogRef: MatDialogRef<ErrorComponent>;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
  }

  createEvent(formDirective: FormGroupDirective) {
    if (this.form.invalid || this.findInvalidControls()) {
      if (this.dialog.openDialogs.length === 0) {
        this.dialogRef =
          this.dialog.open(ErrorComponent, { data: { message: 'Resolve invalid inputs before submiting' }, panelClass: 'my-dialog' });
      }
      return;
    }
    // Send photo as base64 instead of whole file
    // this.form.get('poster').setValue(this.posterPreview);
    const formJSON = this.form.getRawValue();
    formJSON.eventDate.setHours(this.exportTime.hour);
    formJSON.eventDate.setMinutes(this.exportTime.minute);
    this.isLoading = true;
    this.http.post<any>(BACKEND_URL + '/event/create', formJSON)
      .subscribe((serverResponse: any) => {
        this.snackBar.open('Successfully Created Event', null, {
          duration: 3000,
        });
        formDirective.resetForm();
        this.form.reset();
        this.serverError = false;
        this.errorCode = '';
        this.isLoading = false;
      }, error => {
        console.log(error);
        this.errorCode = 'A01001124000';
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

  onCalendarKeydown(event) {
    return !event;
  }

  onPosterPicked(event: Event) {
    if (!((event.target as HTMLInputElement).files[0])) {
      return;
    }
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ poster: file });
    this.form.get('poster').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.posterPreview = reader.result;
    };
    try { reader.readAsDataURL(file); } catch (error) { console.log(error); }
  }

  ngOnInit() {
    this.exportTime.hour = this.minDate.getHours();
    this.exportTime.minute = this.minDate.getMinutes();
    // TODO: Get Hall Numbers
    this.isLoading = true;
    this.http.post<any>(BACKEND_URL + '/halls/numbers', null)
      .subscribe((serverResponse: any) => {
        this.hallNumbersArray = serverResponse;
        this.serverError = false;
        this.errorCode = '';
      }, error => {
        console.log(error);
      });
    this.isLoading = false;
    this.form = new FormGroup({
      eventName: new FormControl(null, { validators: [Validators.required] }),
      description: new FormControl(null, { validators: [Validators.required] }),
      eventDate: new FormControl(null, { validators: [Validators.required] }),
      hallNumber: new FormControl(null, { validators: [Validators.required] }),
      poster: new FormControl(null, { asyncValidators: [mimeType], validators: [Validators.required] }),
    });
  }
}
