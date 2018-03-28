import { UIService } from "./../shared/ui.service";
import { AngularFirestore } from "angularfire2/firestore";
import { Subject } from "rxjs/Subject";
import { Exercise } from "./exercise.model";
import { Injectable } from "@angular/core";
import { Subscription } from "rxjs/Subscription";

@Injectable()
export class TrainingService {
  private availableExercises: Exercise[] = [];
  availableExercisesChanged = new Subject<Exercise[]>();

  private runningExercise: Exercise;
  runningExerciseChanged = new Subject<Exercise>();

  finishedExercisesChanged = new Subject<Exercise[]>();

  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UIService) {}

  fetchAvailableExercises() {
    this.uiService.loadingStateChanged.next(true);
    this.fbSubs.push(
      this.db
        .collection("availableExercises")
        .snapshotChanges()
        .map(docArray => {
          return docArray.map(doc => {
            // throw new Error();
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data().name,
              duration: doc.payload.doc.data().duration,
              calories: doc.payload.doc.data().calories
            };
          });
        })
        .subscribe(
          (exercises: Exercise[]) => {
            this.availableExercises = exercises;
            this.availableExercisesChanged.next([...this.availableExercises]);
            this.uiService.loadingStateChanged.next(false);
          },
          error => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(
              "Fetching exercises failed, please try again later"
            );
            this.availableExercisesChanged.next(null);
          }
        )
    );
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this.runningExerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: "completed"
    });
    this.runningExercise = null;
    this.runningExerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: "cancelled"
    });
    this.runningExercise = null;
    this.runningExerciseChanged.next(null);
  }

  getRunningExercise(): Exercise {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(
      this.db
        .collection("finishedExercises")
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.finishedExercisesChanged.next(exercises);
        })
    );
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection("finishedExercises").add(exercise);
  }
}
