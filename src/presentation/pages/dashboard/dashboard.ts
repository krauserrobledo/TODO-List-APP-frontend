import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskList } from '../../components/task/task-list/task-list';
import { TaskDetails } from '../../components/task/task-details/task-details';
import { TaskModel } from '../../../domain/models/task/task-model';
import { TaskStore } from './../../stores/task-store';
import { CategoryList } from "../../components/categories/category-list/category-list";
import { TagList } from "../../components/tag/tag-list/tag-list";
import { PanelModule} from "primeng/panel";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TaskList, TaskDetails, CategoryList, TagList, PanelModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent {
  private store = inject(TaskStore);

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
    this.store.deleteTask(task.id);
    if (this.selectedTask?.id === task.id) this.selectedTask = null;
  }

  changeStatus(event: { task: TaskModel; status: TaskModel['status'] }) {
    const updated = { ...event.task, status: event.status };
    this.store.updateTask(event.task.id, updated);
    this.selectedTask = updated;
  }

  updateTask(task: TaskModel) {
    this.store.updateTask(task.id, task);
    this.selectedTask = task;
    this.closeForm();
  }

  createTask(task: TaskModel) {
    this.store.createTask(task);
    this.closeForm();
  }

  closeDetails() {
    this.selectedTask = null;
  }
}
