import { Subscription } from "rxjs/Subscription";
import { TrainingService } from "./training.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-training",
  templateUrl: "./training.component.html",
  styleUrls: ["./training.component.css"]
})
export class TrainingComponent implements OnInit {
  ongoingTraining = false;
  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.trainingService.runningExerciseChanged.subscribe(newRunning => {
      if (newRunning) {
        this.ongoingTraining = true;
      } else {
        this.ongoingTraining = false;
      }
    });
  }
}
