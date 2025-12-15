import { Component, EventEmitter, inject, Output } from '@angular/core';
import { DatePickerModule } from 'primeng/datepicker';
import { Store } from '@ngxs/store';
import { TaskState } from '../../stores/task/task.state';
import { TaskModel } from '../../../domain/models/task/task-model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar-task',
  standalone: true,
  imports: [DatePickerModule, FormsModule],
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.css']
})
export class CalendarTaskComponent {
  private store = inject(Store);

  @Output() daySelected = new EventEmitter<string | null>();


  tasks: TaskModel[] = [];
  taskDates = new Set<string>();

  ngOnInit() {
    this.store.select(TaskState.tasks).subscribe(tasks => {
      this.tasks = tasks;

      this.taskDates = new Set(
        tasks
          .filter(t => t.dueDate)
          .map(t => this.toKey(new Date(t.dueDate!)))
      );
    });
  }

  // turns date into YYYY-MM-DD
  private toKey(date: Date): string {
    return `${date.getFullYear()}-${
      (date.getMonth() + 1).toString().padStart(2, '0')
    }-${date.getDate().toString().padStart(2, '0')}`;
  }

  hasTask(meta: any): boolean {
    if (!meta) return false;

    const jsDate = new Date(meta.year, meta.month, meta.day);
    const key = this.toKey(jsDate);

    return this.taskDates.has(key);
  }

 onDaySelected(date: Date) {
  const key = this.toKey(date);

  if (!this.taskDates.has(key)) {
    this.daySelected.emit(null);
    return;
  }

  this.daySelected.emit(key);
}

}
