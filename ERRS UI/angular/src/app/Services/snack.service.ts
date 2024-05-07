import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string = 'Ok') {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center'
    });
  }


}
