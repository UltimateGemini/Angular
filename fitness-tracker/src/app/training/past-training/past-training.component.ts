import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  private exChangedSubscription: Subscription;
  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exChangedSubscription = this.trainingService.finishedExcercisesChanged.subscribe((exercises: Exercise[]) => {
      this.dataSource.data = exercises;
    });
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  doFilter(filterVal: string) {
    this.dataSource.filter = filterVal.trim().toLowerCase();
  }

  ngOnDestroy() {
    if (this.exChangedSubscription) {
      this.exChangedSubscription.unsubscribe();
    }
  }
}
