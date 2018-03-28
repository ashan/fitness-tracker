import { SharedModule } from "./../shared/shared.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "./../material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { CommonModule } from "@angular/common";
import { AngularFireAuthModule } from "angularfire2/auth";

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [ReactiveFormsModule, AngularFireAuthModule, SharedModule],
  exports: []
})
export class AuthModule {}
