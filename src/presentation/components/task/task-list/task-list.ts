import { Component, inject, Output, EventEmitter, effect, Injector } from '@angular/core';
import { TaskStore } from '../../../stores/task';
import { TaskModel, TaskStatus } from '../../../../domain/models/task/task-model';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { ListboxModule } from "primeng/listbox";
import { DatePickerModule } from 'primeng/datepicker';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    ListboxModule,
    DatePickerModule,
    PanelModule,
    InputTextModule
  ],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css']
})

export class TaskList {
  private store = inject(TaskStore);
  private fb = inject(FormBuilder);

  tasks = this.store.tasks;
  isLoading = this.store.isLoading;
  error = this.store.error;

  @Output() selectTask = new EventEmitter<TaskModel>();

  showFormDialog = false;
  showErrorDialog = false;
  selectedTask: TaskModel | null = null;

  statusOptions = [
    { label: 'Non Started', value: 'Non Started' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Paused', value: 'Paused' },
    { label: 'Late', value: 'Late' },
    { label: 'Finished', value: 'Finished' }
  ];

  listForm = this.fb.group({
    newTitle: ['', Validators.required],
    newDescription: [''],
    newDueDate: [null, Validators.required],
    newStatus: ['Non Started', Validators.required]
  });

  ngOnInit() {
    this.store.loadTasks();
  }

  onSelect(task: TaskModel) {
    this.selectedTask = task;
    this.selectTask.emit(task);
  }

  addTask() {
    if (this.listForm.invalid) {
      this.listForm.markAllAsTouched();
      return;
    }

    const formValue = this.listForm.value;

    const model: TaskModel = {
      id: crypto.randomUUID(),
      title: formValue.newTitle!,
      description: formValue.newDescription ?? '',
      status: formValue.newStatus as TaskStatus,
      dueDate: new Date(formValue.newDueDate!),
      userId: ''
    };

    this.store.createTask(model);

    if (this.store.error()) {
      this.showErrorDialog = true;
    } else {
      this.listForm.reset({
        newStatus: 'Non Started'
      });
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
