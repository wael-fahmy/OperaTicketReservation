import { AuthService } from '../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ErrorComponent } from 'src/app/error/error.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar, MAT_DATE_LOCALE, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class SignupComponent implements OnInit, OnDestroy {
  // Did an error occur while connecting?
  serverError: boolean;
  // The error code sent by server
  errorCode: string;
  // Show spinner
  isLoading = false;
  // Hide password
  hide = true;
  // Birth date picker server response
  date = new Date();
  minDate = new Date(1940, 0, 1);
  // Gender
  gender = '';
  // Arrays for address
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
  chosenCity;
  // Form
  form: FormGroup;
  // Photo
  // photoPreview;
  // User Model
  private authStatusSub: Subscription;
  private signupSubscription: Subscription;
  private serverErrorSubscription: Subscription;
  private errorCodeSubscription: Subscription;

  dialogRef: MatDialogRef<ErrorComponent>;

  constructor(public authService: AuthService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  signup() {
    if (this.form.invalid || this.findInvalidControls()) {
      if (this.dialog.openDialogs.length === 0) {
        this.dialogRef =
          this.dialog.open(ErrorComponent, { data: { message: 'Resolve invalid inputs before submiting' }, panelClass: 'my-dialog' });
      }
      return;
    }
    this.isLoading = true;
    const datePicked = this.form.get('Birth_Date');
    const tzoffset = (datePicked.value).getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = (new Date(datePicked.value - tzoffset));
    datePicked.setValue(localISOTime);

    this.authService.signup(this.form.getRawValue());

    this.authService.getServerErrorSignUpListener()
      .subscribe((serverErrorSignUpResponse: boolean) => {
        this.serverError = serverErrorSignUpResponse;
      });

    this.authService.getErrorCodeSignUpListener()
      .subscribe((serverErrorSignUpResponse: string) => {
        this.errorCode = serverErrorSignUpResponse;
      });

    this.signupSubscription = this.authService.getSignupUpdated()
      .subscribe((serverResponse: any) => {
        if (serverResponse.message !== '00') {
          if (this.dialog.openDialogs.length === 0) {
            this.dialogRef =
              this.dialog.open(ErrorComponent, { data: { message: serverResponse.message }, panelClass: 'my-dialog' });
          }
          this.serverErrorSubscription = this.authService.getServerErrorSignUpListener()
            .subscribe((serverErrorSignUpResponse: boolean) => {
              this.isLoading = false;
              this.serverError = serverErrorSignUpResponse;
            });

          this.errorCodeSubscription = this.authService.getErrorCodeSignUpListener()
            .subscribe((serverErrorSignUpResponse: string) => {
              this.isLoading = false;
              this.errorCode = serverErrorSignUpResponse;
            });

          try { this.signupSubscription.unsubscribe(); } catch (error) { }
          try { this.serverErrorSubscription.unsubscribe(); } catch (error) { }
          try { this.errorCodeSubscription.unsubscribe(); } catch (error) { }
          return;
        } else {
          this.snackBar.open(serverResponse.message, null, {
            duration: 2500,
          });
        }
      }, error => {
        console.log(error);
        try { this.signupSubscription.unsubscribe(); } catch (error) { }
        try { this.serverErrorSubscription.unsubscribe(); } catch (error) { }
        try { this.errorCodeSubscription.unsubscribe(); } catch (error) { }
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

  // onPhotoPicked(event: Event) {
  //   if (!((event.target as HTMLInputElement).files[0])) {
  //     return;
  //   }
  //   const file = (event.target as HTMLInputElement).files[0];
  //   this.form.patchValue({ photo: file });
  //   this.form.get('photo').updateValueAndValidity();
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.photoPreview = reader.result;
  //   };
  //   try { reader.readAsDataURL(file); } catch (error) { console.log(error); }
  // }


  ngOnInit() {
    this.serverError = false;
    this.errorCode = '';

    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus => { this.isLoading = false; });

    this.form = new FormGroup({
      UserName: new FormControl(null, { validators: [Validators.required] }),
      User_Password: new FormControl(null, { validators: [Validators.required, Validators.minLength(8)] }),
      // tslint:disable-next-line: max-line-length
      First_Name: new FormControl(null, { validators: [Validators.required, Validators.pattern('[^0-9\.\?\!\@\#\$\%\^\&\*\(\)\<\>\{\}]+')] }),
      // tslint:disable-next-line: max-line-length
      Last_Name: new FormControl(null, { validators: [Validators.required, Validators.pattern('[^0-9\.\?\!\@\#\$\%\^\&\*\(\)\<\>\{\}]+')] }),
      Birth_Date: new FormControl(null, { validators: [Validators.required] }),
      Gender: new FormControl(null, { validators: [Validators.required] }),
      City: new FormControl(null, { validators: [Validators.required] }),
      User_Address: new FormControl(null),
      Email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      Title: new FormControl(null, { validators: [Validators.required] }),
    });

    // this.getCountries();
  }

  ngOnDestroy() {
    try { this.authStatusSub.unsubscribe(); } catch (error) { }
    try { this.signupSubscription.unsubscribe(); } catch (error) { }
    try { this.serverErrorSubscription.unsubscribe(); } catch (error) { }
    try { this.errorCodeSubscription.unsubscribe(); } catch (error) { }
  }
}
