import { MatSnackBar } from "@angular/material";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class UIService {
  loadingStateChanged = new Subject<boolean>();

  constructor(private snackbarService: MatSnackBar) {}
  showSnackbar(message, action=null, duration=3000) {
    this.snackbarService.open(message, action, { duration });
  }
}
