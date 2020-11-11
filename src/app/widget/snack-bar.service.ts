import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class SnackBarService {

  constructor(private matSnackBar: MatSnackBar) { }

  openSnackBar(message: any): void {
    console.log(message);
    this.matSnackBar.open(message?.error ? message.error.message : message, null, {duration: 1000, panelClass: ['polish-station-snack-bar']});
  }
}
