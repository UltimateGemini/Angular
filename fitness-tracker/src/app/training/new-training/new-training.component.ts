import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  isLoading = false;
  exerciseSubscription: Subscription;
  private loadingSub: Subscription;

  constructor(private trainingService: TrainingService, private uiService: UIService) { }

  ngOnInit() {
    this.loadingSub = this.uiService.isLoading.subscribe( res => {
      this.isLoading = res;
    });
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      exercises => {
        this.exercises = exercises;
      }
    );
    this.fetchExcercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  fetchExcercises() {
    this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }

    if (this.loadingSub) {
      this.loadingSub.unsubscribe();
    }
  }
}
