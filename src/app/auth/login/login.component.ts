import { Subscription } from "rxjs/Subscription";
import { UIService } from "./../../shared/ui.service";
import { AuthService } from "./../auth.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  private laodingSubs: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) {}

  ngOnInit() {
    this.laodingSubs = this.uiService.loadingStateChanged.subscribe(
      isLoading => {
        this.isLoading = isLoading;
      }
    );
    this.loginForm = new FormGroup({
      email: new FormControl("", {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl("", { validators: [Validators.required] })
    });
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

  ngOnDestroy(): void {
    if (this.laodingSubs) this.laodingSubs.unsubscribe();
  }
}
