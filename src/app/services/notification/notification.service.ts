import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { duration } from 'moment';

export const coerceToArray = <T>(value: T | T[]): T[] => (
  Array.isArray(value)
    ? value
    : [value]
);

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackbar: MatSnackBar, private zone: NgZone) { }

  error(message: string): void {
    this.show(message, { panelClass: ['snackbar-container', 'bg-danger'] });
  }

  success(message: string): void {
    this.show(message, { panelClass: ['snackbar-container', 'bg-success'] });
  }

  warning(message: string): void {
    this.show(message, { panelClass: ['snackbar-container', 'bg-warning'] });
  }

  private show(message: string, customConfig: MatSnackBarConfig = {}): void {
    const customClasses = coerceToArray(customConfig.panelClass)
      .filter((v) => typeof v === 'string') as string[];

    this.zone.run(() => {
      this.snackbar.open(
        message,
        'x',
        { ...customConfig, panelClass: ['snackbar-container', ...customClasses],duration:3000 }
      );
    });
  }

}
