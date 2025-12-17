import { Component, inject, ViewChild } from '@angular/core';

import { TaskList } from '../../components/task/task-list/task-list';
import { TaskDetails } from '../../components/task/task-details/task-details';
import { TaskModel } from '../../../domain/models/task/task-model';
import { CategoryList } from "../../components/categories/category-list/category-list";
import { TagList } from "../../components/tag/tag-list/tag-list";
import { PanelModule } from "primeng/panel";
import { Store } from '@ngxs/store';
import { AddTask, DeleteTask, UpdateTask } from '../../stores/task/task.actions';
import { ButtonModule } from 'primeng/button';
import { CalendarTaskComponent } from '../../components/calendar/calendar';
import { TaskFiltersComponent } from "../../components/filter/filters";
import { TaskState } from '../../stores/task/task.state';

/**
 * DashboardComponent serves as the main interface for users to manage their tasks.
 * It integrates various components such as TaskList, TaskDetails, CategoryList,
 * TagList, CalendarTaskComponent, and TaskFiltersComponent to provide a comprehensive
 * task management experience. Users can view, create, edit, and delete tasks,
 * as well as filter tasks based on different criteria.
 */
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

  // Lifecycle hook to initialize component data
  ngOnInit() {
    this.store.select(TaskState.tasks).subscribe(tasks => {
      this.tasks = tasks;
      this.filteredTasks = tasks;
    });
  }

  // Handles task selection
  onSelectTask(task: TaskModel) {
    this.selectedTask = task;
  }

  // Enables task editing
  editTask(task: TaskModel) {
    this.taskToEdit = task;
    this.showForm = true;
  }

  // closes the task form
  closeForm() {
    this.showForm = false;
    this.taskToEdit = null;
  }

  // Deletes a task
  deleteTask(task: TaskModel) {
    this.store.dispatch(new DeleteTask(task.id));
    if (this.selectedTask?.id === task.id) this.selectedTask = null;
  }

  // Changes the status of a task
  changeStatus(event: { task: TaskModel; status: TaskModel['status'] }) {
    const updated = { ...event.task, status: event.status };
    this.store.dispatch(new UpdateTask(event.task.id, updated));
    this.selectedTask = updated;
  }

  // Updates an existing task
  updateTask(task: TaskModel) {
    this.store.dispatch(new UpdateTask(task.id, task));
    this.selectedTask = task;
    this.closeForm();
  }

  // Creates a new task
  createTask(task: TaskModel) {
    this.store.dispatch(new AddTask(task));
    this.closeForm();
  }

  // Closes the task details view
  closeDetails() {
    this.selectedTask = null;
  }

  // Applies filter based on task state
  onFilterChange(state: string) {
    this.taskList.applyFilter(state);
  }

  // Applies date filter from calendar
  onCalendarFilter(dateKey: string | null) {
    this.taskList.applyDateFilter(dateKey);
  }
}
