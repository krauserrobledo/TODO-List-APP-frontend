import { Component, inject, signal } from '@angular/core';
import { TaskStore } from './../../stores/task-store';
import { TaskModel } from '../../../domain/models/task/task-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.html',
  styleUrls: ['./task.css']
})
export class Task {
  private store = inject(TaskStore);

  tasks = this.store.tasks;
  isLoading = this.store.isLoading;
  error = this.store.error;

  newTitle = signal('');
  newStatus = signal<TaskModel['status']>('non_started');
  newDueDate: string = '';

  ngOnInit() {
    this.store.loadTasks();
  }

  addTask() {
    const title = this.newTitle();
    if (!title.trim()) return;

    const model: TaskModel = {
      id: crypto.randomUUID(),
      title,
      status: this.newStatus(),
      dueDate: new Date(this.newDueDate),
      userId: ''
    };

    this.store.createTask(model);
    this.newTitle.set('');
    this.newStatus.set('non_started');
  }

  changeStatus(task: TaskModel, status: TaskModel['status']) {
    this.store.updateTask(task.id, { ...task, status });
  }

  deleteTask(task: TaskModel) {
    this.store.deleteTask(task.id);
  }
}
