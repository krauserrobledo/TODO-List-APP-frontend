import { Component, Output, EventEmitter, inject } from "@angular/core";
import { Store } from '@ngxs/store';
import { TaskState } from '../../stores/task/task.state';
import { TaskModel } from '../../../domain/models/task/task-model';

/**
 * Component for filtering tasks based on their status.
 */
@Component({
  selector: 'app-filters',
  standalone: true,
  templateUrl: './filters.html',
  imports: []
})
export class TaskFiltersComponent {
  private store = inject(Store);

  @Output() filterChange = new EventEmitter<string>();

  tasks: TaskModel[] = [];

  states = [
    { label: 'All', value: "" },
    { label: 'Non Started', value: 'Non Started' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Paused', value: 'Paused' },
    { label: 'Finished', value: 'Finished' },
    { label: 'Late', value: 'Late' }
  ];

  active: string = "";

  constructor() {
    this.store.select(TaskState.tasks).subscribe(tasks => {
      this.tasks = tasks;
    });
  }
  // Get the count of tasks for a given state
  count(state: string): number {
    if (!state) return this.tasks.length;
    return this.tasks.filter(t => t.status === state).length;
  }

  // Select a filter and emit the change
  selectFilter(state: string) {
    this.active = state;
    this.filterChange.emit(state);
  }
}
