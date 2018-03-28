import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { HeaderComponent } from "./navigation/header/header.component";
import { SidenavListComponent } from "./navigation/sidenav-list/sidenav-list.component";
import { BrowserModule } from "@angular/platform-browser";
import { MaterialModule } from "./material.module";
import { AppRoutingModule } from "./app-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AngularFireModule } from "angularfire2";
import { environment } from "../environments/environment";
import { AuthModule } from "./auth/auth.module";
import { TrainingModule } from "./training/training.module";
import { AuthService } from "./auth/auth.service";
import { TrainingService } from "./training/training.service";
import { UIService } from "./shared/ui.service";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    TrainingModule
  ],
  providers: [AuthService, TrainingService, UIService],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {}
