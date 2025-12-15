import { Component, inject, ViewChild } from '@angular/core';

import { TaskList } from '../../components/task/task-list/task-list';
import { TaskDetails } from '../../components/task/task-details/task-details';
import { TaskModel } from '../../../domain/models/task/task-model';
import { CategoryList } from "../../components/categories/category-list/category-list";
import { TagList } from "../../components/tag/tag-list/tag-list";
import { PanelModule} from "primeng/panel";
import { Store } from '@ngxs/store';
import { AddTask, DeleteTask, UpdateTask } from '../../stores/task/task.actions';
import { ButtonModule } from 'primeng/button';
import { CalendarTaskComponent } from '../../components/calendar/calendar';
import { TaskFiltersComponent } from "../../components/filter/filters";
import { TaskState } from '../../stores/task/task.state';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TaskList, TaskDetails, CategoryList, TagList, PanelModule, ButtonModule, CalendarTaskComponent, TaskFiltersComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent {

  @ViewChild(TaskList) taskList!: TaskList;

  private store = inject(Store);

  selectedTask: TaskModel | null = null;
  taskToEdit: TaskModel | null = null;
  showForm = false;
  filteredTasks: TaskModel[] = [];
  tasks: TaskModel[] = [];

  ngOnInit() {
  this.store.select(TaskState.tasks).subscribe(tasks => {
    this.tasks = tasks;
    this.filteredTasks = tasks;
  });
}

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
    this.store.dispatch(new DeleteTask(task.id));
    if (this.selectedTask?.id === task.id) this.selectedTask = null;
  }

  changeStatus(event: { task: TaskModel; status: TaskModel['status'] }) {
    const updated = { ...event.task, status: event.status };
    this.store.dispatch(new UpdateTask(event.task.id, updated));
    this.selectedTask = updated;
  }

  updateTask(task: TaskModel) {
    this.store.dispatch(new UpdateTask(task.id, task));
    this.selectedTask = task;
    this.closeForm();
  }

  createTask(task: TaskModel) {
    this.store.dispatch(new AddTask(task));
    this.closeForm();
  }

  closeDetails() {
    this.selectedTask = null;
  }

  onFilterChange(state: string) {
    this.taskList.applyFilter(state);
  }

  onCalendarFilter(dateKey: string | null) {
  this.taskList.applyDateFilter(dateKey);
}
}
