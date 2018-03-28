import { Subscription } from "rxjs/Subscription";
import { AuthService } from "./../auth.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UIService } from "../../shared/ui.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
  providers: []
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate;
  isLoading = false;
  private loadingSubs: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) {}

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
      isLoading => {
        this.isLoading = isLoading;
      }
    );

    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(loginForm: NgForm) {
    this.authService.registerUser({
      email: loginForm.value.email,
      password: loginForm.value.password
    });
  }

  ngOnDestroy(): void {
    if (this.loadingSubs) this.loadingSubs.unsubscribe();
  }
}
