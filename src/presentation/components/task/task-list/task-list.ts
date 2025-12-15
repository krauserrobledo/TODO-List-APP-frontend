import { Component, inject, Output, EventEmitter, ViewChild } from '@angular/core';
import { TaskModel } from '../../../../domain/models/task/task-model';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { ListboxModule } from "primeng/listbox";
import { DatePickerModule } from 'primeng/datepicker';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { Store } from '@ngxs/store';
import { AddTask, DeleteTask, LoadTasks } from '../../../stores/task/task.actions';
import { TaskStatus } from '../../../../domain/models/task/task-status';
import { Observable } from 'rxjs';
import { TaskState } from '../../../stores/task/task.state';

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

  private store = inject(Store);
  private fb = inject(FormBuilder);

  tasks: TaskModel[] = [];
  filtered: TaskModel[] = [];

  // filtros activos
  private statusFilter: TaskStatus | '' = '';
  private dateFilter: string | null = null; // YYYY-MM-DD

  @Output() selectTask = new EventEmitter<TaskModel>();

  showFormDialog = false;
  showErrorDialog = false;
  selectedTask: TaskModel | null = null;

  error$: Observable<String | null> = this.store.select(TaskState.error);

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
    newDueDate: [null],
    newStatus: ['Non Started', Validators.required]
  });

  ngOnInit() {
    this.store.dispatch(new LoadTasks());

    this.store.select(TaskState.tasks).subscribe(tasks => {
      this.tasks = tasks;
      this.applyAllFilters();
    });
  }

  // FILTRO UNIFICADO
  private applyAllFilters() {
    let result = [...this.tasks];

    // filtro por estado
    if (this.statusFilter) {
      result = result.filter(t => t.status === this.statusFilter);
    }

    // filtro por fecha
    if (this.dateFilter) {
      result = result.filter(t =>
        t.dueDate &&
        new Date(t.dueDate).toISOString().split('T')[0] === this.dateFilter
      );
    }

    this.filtered = result;
  }

  // llamado desde Filters
  applyFilter(state: string) {
    this.statusFilter = (state || '') as TaskStatus | '';
    this.applyAllFilters();
  }

  // llamado desde Dashboard (cuando Calendar emite)
  applyDateFilter(dateKey: string | null) {
    this.dateFilter = dateKey;
    this.applyAllFilters();
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
      dueDate: formValue.newDueDate ? new Date(formValue.newDueDate) : null,
      userId: ''
    };

    this.store.dispatch(new AddTask(model)).subscribe({
      next: () => {
        this.listForm.reset({ newStatus: 'Non Started' });
        this.showFormDialog = false;
      }
    });
  }

  deleteTask(task: TaskModel) {
    this.store.dispatch(new DeleteTask(task.id));
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
