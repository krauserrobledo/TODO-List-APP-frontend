import { Component, inject, Output, EventEmitter, effect } from '@angular/core';
import { TaskStore } from '../../../stores/task-store';
import { TaskModel } from '../../../../domain/models/task/task-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { ListboxModule } from "primeng/listbox";
import { DatePickerModule } from 'primeng/datepicker';
import { PanelModule } from 'primeng/panel';

import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, DialogModule, ListboxModule, DatePickerModule, PanelModule, InputTextModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css']
})
export class TaskList {
  private store = inject(TaskStore);

  tasks = this.store.tasks;
  isLoading = this.store.isLoading;
  error = this.store.error;

  @Output() selectTask = new EventEmitter<TaskModel>();

  showFormDialog = false;
  showErrorDialog = false;
  selectedTask: TaskModel | null = null;

  newTitle: string = '';
  newDescription: string = '';
  newStatus: TaskModel['status'] = 'Non Started';
  newDueDate: string = '';

  statusOptions = [
    { label: 'Non Started', value: 'Non Started' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Paused', value: 'Paused' },
    { label: 'Late', value: 'Late' },
    { label: 'Finished', value: 'Finished' }
  ];

  ngOnInit() {
    this.store.loadTasks();
    effect(() => {
      if (this.store.error()) {
        this.showErrorDialog = true;
      }
    });
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

      if (this.store.error()) {  
        this.showErrorDialog = true;
      } else {
        this.newTitle = '';
        this.newDescription = '';
        this.newStatus = 'Non Started';
        this.newDueDate = '';
        this.showFormDialog = false;
      }
    }

  deleteTask(task: TaskModel) {
    this.store.deleteTask(task.id);
    if (this.selectedTask?.id === task.id) this.selectedTask = null;
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'Non Started': return 'non_started';
      case 'In Progress': return 'in_progress';
      case 'Paused': return 'paused';
      case 'Late': return 'late';
      case 'Finished': return 'finished';
      default: return '';
    }
  }
  
}
