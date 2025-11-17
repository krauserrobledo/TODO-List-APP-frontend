import { Component, inject, Output, EventEmitter } from '@angular/core';
import { TaskStore } from '../../../stores/task-store';
import { TaskModel } from '../../../../domain/models/task/task-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css']
})
export class TaskList {
  private store = inject(TaskStore);

  tasks = this.store.tasks;
  isLoading = this.store.isLoading;
  error = this.store.error;

  @Output() selectTask = new EventEmitter<TaskModel>();

  showForm = false;
  selectedTask: TaskModel | null = null;

  newTitle: string = '';
  newDescription: string = '';
  newStatus: TaskModel['status'] = 'Non Started';
  newDueDate: string = '';

  ngOnInit() {
    this.store.loadTasks();
  }

  onSelect(task: TaskModel) {
    this.selectedTask = task;
    this.selectTask.emit(task);
  }

  addTask() {
    if (!this.newTitle.trim() || !this.newDescription.trim()) return;

    const model: TaskModel = {
      id: crypto.randomUUID(),
      title: this.newTitle,
      description: this.newDescription,
      status: this.newStatus,
      dueDate: new Date(this.newDueDate),
      userId: ''
    };

    this.store.createTask(model);

    this.newTitle = '';
    this.newDescription = '';
    this.newStatus = 'Non Started';
    this.newDueDate = '';
    this.showForm = false;
  }

  deleteTask(task: TaskModel) {
    this.store.deleteTask(task.id);
    if (this.selectedTask?.id === task.id) this.selectedTask = null;
  }
}
