import { UIService } from "./../../shared/ui.service";
import { DataSource } from "@angular/cdk/table";
import { map } from "rxjs/operators";
import { NgForm } from "@angular/forms";
import { TrainingService } from "./../training.service";
import { Exercise } from "./../exercise.model";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatSelectChange } from "@angular/material";
import { AngularFirestore } from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"]
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  private exercisesSubscription: Subscription;
  isLoading = false;
  private isLoadingSubscription: Subscription;

  constructor(
    private traningService: TrainingService,
    private uiService: UIService
  ) {}

  ngOnInit() {
    this.isLoadingSubscription = this.uiService.loadingStateChanged.subscribe(
      isLoading => (this.isLoading = isLoading)
    );
    this.exercisesSubscription = this.traningService.availableExercisesChanged.subscribe(
      exercises => (this.exercises = exercises)
    );
    this.fetchExercises();
  }

  fetchExercises() {
    this.traningService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.traningService.startExercise(form.value.selectedExercise);
  }

  ngOnDestroy(): void {
    if (this.exercisesSubscription) this.exercisesSubscription.unsubscribe();
    if (this.isLoadingSubscription) this.isLoadingSubscription.unsubscribe();
  }
}
