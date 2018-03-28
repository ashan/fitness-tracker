import { SharedModule } from './../shared/shared.module';
import { PastTrainingComponent } from "./past-training/past-training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { TrainingComponent } from "./training.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { StopTrainingComponent } from "./current-training/stop-training-dialog.component";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { PasswordValidator } from "../auth/signup/password-validator.directive.directive";
@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    StopTrainingComponent,
    PasswordValidator
  ],
  imports: [
    SharedModule, 
    AngularFirestoreModule
  ],
  exports: [],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {}
