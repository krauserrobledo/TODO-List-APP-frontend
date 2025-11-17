import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskList } from '../../components/task/task-list/task-list';
import { TaskDetails } from '../../components/task/task-details/task-details';
import { TaskForm } from '../../components/task/task-form/task-form';
import { TaskModel } from '../../../domain/models/task/task-model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TaskList, TaskDetails, TaskForm],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent {
  selectedTask: TaskModel | null = null;
  taskToEdit: TaskModel | null = null;
  showForm = false;

  onSelectTask(task: TaskModel) {
    this.selectedTask = task;
  }

  editTask(task: TaskModel) {
    this.taskToEdit = task;
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.taskToEdit = null;
  }

  deleteTask(task: TaskModel) {
    if (this.selectedTask?.id === task.id) this.selectedTask = null;
  }

  changeStatus(event: { task: TaskModel; status: TaskModel['status'] }) {
    const updated = { ...event.task, status: event.status };
    this.selectedTask = updated;
  }

  closeDetails() {
    this.selectedTask = null;
  }
}
