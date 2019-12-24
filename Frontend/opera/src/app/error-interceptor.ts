// import { ErrorComponent } from './error/error.component';
import { ErrorService } from './error/error.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Injectable, ErrorHandler } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor, ErrorHandler {

  constructor(private dialog: MatDialog, private errorService: ErrorService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'A Server Related Error Occurred!';
        if (error.error.message) {
          errorMessage = error.error.message;
        }
        // let dialogRef: MatDialogRef<ErrorComponent>;
        // if (this.dialog.openDialogs.length === 0) {
        //   dialogRef = this.dialog.open(ErrorComponent, { data: { message: errorMessage }, panelClass: 'my-dialog' });
        // }
        return throwError(error);
      })
    );
  }

  handleError(error: any): void {
    console.log('Testing Chunk Error Handler ', error);
    const chunkFailedMessage = /Loading chunk/;
    if (chunkFailedMessage.test(error.message)) {
      window.location.reload();
    }
  }
}
