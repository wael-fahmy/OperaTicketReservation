import { AuthService } from '../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ErrorComponent } from '../../error/error.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SignInResponse } from '../auth-data.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
  dialogRef: MatDialogRef<ErrorComponent>;
  errorCode: string;
  hide = true;
  isLoading = false;
  private authStatusSub: Subscription;
  private errorCodeSubscription: Subscription;
  private serverErrorSubscription: Subscription;
  private signinSubscription: Subscription;
  serverError: boolean;

  signin(form: NgForm) {
    if (form.value.password.length < 8) {
      form.controls.password.setErrors({ incorrect: true });
      if (this.dialog.openDialogs.length === 0) {
        this.dialogRef =
          this.dialog.open(ErrorComponent, { data: { message: 'Resolve invalid inputs before submiting' }, panelClass: 'my-dialog' });
      }
      return;
    }

    if (form.invalid) {
      if (this.dialog.openDialogs.length === 0) {
        this.dialogRef =
          this.dialog.open(ErrorComponent, { data: { message: 'Resolve invalid inputs before submiting' }, panelClass: 'my-dialog' });
      }
      return;
    }

    if (this.validate(form.value.email)) {
      this.isLoading = true;

      this.authService.signin(form.value.email, form.value.password);

      this.serverErrorSubscription = this.authService.getServerErrorLoginListener()
        .subscribe((serverErrorLoginResponse: boolean) => {
          this.serverError = serverErrorLoginResponse;
        });

      this.errorCodeSubscription = this.authService.getErrorCodeLoginListener()
        .subscribe((serverErrorLoginResponse: string) => {
          this.errorCode = serverErrorLoginResponse;
          this.isLoading = false;
        });

      this.signinSubscription = this.authService.getSigninUpdated()
        .subscribe((signinResponse: SignInResponse) => {
          console.log(signinResponse);
        }, (error: { json: () => void; }) => {
          console.clear();
          console.log(error);
          try { this.signinSubscription.unsubscribe(); } catch (error) { }
          try { this.serverErrorSubscription.unsubscribe(); } catch (error) { }
          try { this.errorCodeSubscription.unsubscribe(); } catch (error) { }
        });
    } else {
      // Validation Error
      form.controls.email.setErrors({ incorrect: true });
      if (this.dialog.openDialogs.length === 0) {
        this.dialogRef =
          this.dialog.open(ErrorComponent, { data: { message: 'Resolve invalid inputs before submiting' }, panelClass: 'my-dialog' });
      }
    }
  }

  findInvalidControls(form: NgForm) {
    for (const name in form.controls) {
      if (form.controls[name].invalid) {
        return true;
      }
    }
    return false;
  }

  validate(email: string): boolean {
    if (/^.+[@].+[.].+$/.test(email)) {
      return true;
    } else if (email.length === 14 && /^\d+$/.test(email)) {
      return true;
    } else if (email.length >= 16 && email.length <= 20 && /^\d+$/.test(email)) {
      return true;
    }
    return false;
  }

  constructor(public authService: AuthService, private dialog: MatDialog) { }

  ngOnInit() {
    this.serverError = false;
    this.errorCode = '';

    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy() {
    try { this.authStatusSub.unsubscribe(); } catch (error) { }
    try { this.signinSubscription.unsubscribe(); } catch (error) { }
    try { this.serverErrorSubscription.unsubscribe(); } catch (error) { }
    try { this.errorCodeSubscription.unsubscribe(); } catch (error) { }
  }
}
