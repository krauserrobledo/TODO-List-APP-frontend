import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskModel } from '../../../../domain/models/task/task-model';
import { SubtaskList } from "../../subtask/subtask-list/subtask-list";

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, FormsModule, SubtaskList],
  templateUrl: './task-details.html',
  styleUrls: ['./task-details.css']
})
export class TaskDetails implements OnChanges {
  @Input() task: TaskModel | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<TaskModel>();
  @Output() changeStatus = new EventEmitter<{ task: TaskModel; status: TaskModel['status'] }>();
  @Output() delete = new EventEmitter<TaskModel>();

  selectedStatus: TaskModel['status'] = 'Non Started';

  ngOnChanges() {
    if (this.task) this.selectedStatus = this.task.status;
  }
}
