import {Subscription} from "rxjs/Subscription"
import { Component, OnInit, EventEmitter, Output, OnDestroy } from "@angular/core";

import { AuthService } from './../../auth/auth.service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth: boolean;
  authSubscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus =>{
      this.isAuth = authStatus;
    })
  }

  ngOnDestroy(): void {
    if(this.authSubscription)
    this.authSubscription.unsubscribe();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout(){
    this.authService.logout();
  }
}
