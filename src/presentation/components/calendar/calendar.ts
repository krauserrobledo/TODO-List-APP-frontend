import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { Store } from '@ngxs/store';
import { TaskState } from '../../stores/task/task.state';
import { TaskModel } from '../../../domain/models/task/task-model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar-task',
  standalone: true,
  imports: [CommonModule, DatePickerModule, FormsModule],
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.css']
})
export class CalendarTaskComponent {
  private store = inject(Store);

  tasks: TaskModel[] = [];
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
  
    const key = date.toLocaleDateString('en-CA'); // YYYY-MM-DD
    return this.taskDates.has(key);
  }
  
  ngOnInit() {
    this.store.select(TaskState.tasks).subscribe(tasks => {
      this.tasks = tasks;
  
      this.taskDates = new Set(
        tasks
          .filter(t => t.dueDate)
          .map(t => new Date(t.dueDate?? "").toLocaleDateString('en-CA'))
      );
    });
  }
  
  
}
