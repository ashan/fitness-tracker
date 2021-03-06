import { Subscription } from "rxjs/Subscription";
import { Component, OnInit, EventEmitter } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { AuthService } from "./../../auth/auth.service";
import { Output } from "@angular/core";

@Component({
  selector: "app-sidenav-list",
  templateUrl: "./sidenav-list.component.html",
  styleUrls: ["./sidenav-list.component.css"]
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth: boolean;
  authSubscription: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(
      authStatus => {
        this.isAuth = authStatus;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.authSubscription) this.authSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
    this.closeSidenav.emit();
  }
}
