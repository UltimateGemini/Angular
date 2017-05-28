import { Component } from '@angular/core';

import{Task} from './model/task';

@Component({
  moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html'
})
export class AppComponent {
  task1: Task = {
    content: "Learn to code",
    completed: false
  }
}
