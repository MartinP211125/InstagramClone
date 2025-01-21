import { Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private dialog: MatDialog, private ngZone: NgZone) { }

  openErrorDialog(message: string) {
    this.ngZone.run(() => {
      this.dialog.open(ErrorDialogComponent, {
        data: { message },
      });
    });
  }

  handleError(error: any) {
    const message = error?.message || 'An unexpected error occurred.';
    this.openErrorDialog(message);
  }
}
