import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { Store } from '@ngxs/store';
import { TaskState } from '../../stores/task/task.state';
import { TaskModel } from '../../../domain/models/task/task-model';

@Component({
  selector: 'app-calendar-task',
  standalone: true,
  imports: [CommonModule, DatePickerModule],
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.css']
})
export class CalendarTaskComponent {
  private store = inject(Store);

  taskDates = new Set<string>();

  constructor() {
    const tasks: TaskModel[] = this.store.selectSnapshot(TaskState.tasks) ?? [];

    tasks.forEach(t => {
      if (t.dueDate) {
        const key = new Date(t.dueDate).toISOString().split('T')[0];
        this.taskDates.add(key);
      }
    });
  }

  hasTask(date: Date | undefined): boolean {
    if (!date) return false;  
    const key = date.toISOString().split('T')[0];
    return this.taskDates.has(key);
  }
  
}
