import { Component, inject } from '@angular/core';
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

  newTitle: string = '';
  newDescription: string = '';
  newStatus: TaskModel['status'] = 'Non Started';
  newDueDate: string = ''; // Angular devuelve string en <input type="date">

  // mapa para traducir estados del backend a clases CSS
  statusClasses: Record<TaskModel['status'], string> = {
    'Non Started': 'non_started',
    'In Progress': 'in_progress',
    'Paused': 'paused',
    'Late': 'late',
    'Finished': 'finished'
  };

  ngOnInit() {
    this.store.loadTasks();
  }

  addTask() {
    if (!this.newTitle.trim()) return;
    if (!this.newDescription.trim()) return;

    const model: TaskModel = {
      id: crypto.randomUUID(),
      title: this.newTitle,
      description: this.newDescription,
      status: this.newStatus, // coincide con backend
      dueDate: new Date(this.newDueDate), // convierte string a Date
      userId: ''
    };

    this.store.createTask(model);

    // reset form
    this.newTitle = '';
    this.newDescription = '';
    this.newStatus = 'Non Started';
    this.newDueDate = '';
  }

  changeStatus(task: TaskModel, status: TaskModel['status']) {
    this.store.updateTask(task.id, { ...task, status });
  }

  deleteTask(task: TaskModel) {
    this.store.deleteTask(task.id);
  }
}
