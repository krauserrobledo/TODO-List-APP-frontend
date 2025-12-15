import { Component, inject, Output, EventEmitter } from '@angular/core';
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
import { TaskState } from '../../../stores/task/task.state';
import { AddTask, DeleteTask, LoadTasks } from '../../../stores/task/task.actions';
import { Observable } from 'rxjs';
import { TaskStatus } from '../../../../domain/models/task/task-status';

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

  tasks$: Observable<TaskModel[]> = this.store.select(TaskState.tasks);
  isLoading$: Observable<Boolean>  =  this.store.select(TaskState.isLoading)
  error$: Observable<String | null> = this.store.select(TaskState.error)

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
    newDueDate: [null],
    newStatus: ['Non Started', Validators.required]
  });

  ngOnInit() {
    
    this.store.dispatch(new LoadTasks());

    this.tasks$.subscribe(tasks => {
      this.tasks = tasks;
      this.filtered = tasks; 
    });

    this.error$.subscribe(error => {
      this.showErrorDialog = !!error; 
    })
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
      dueDate: formValue.newDueDate ? new Date(formValue.newDueDate): null,
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
    this.store.dispatch( new DeleteTask(task.id));
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

  applyFilter(state: string) {
    if (!state) {
      this.filtered = this.tasks;
      return;
    }

    this.filtered = this.tasks.filter(t => t.status === state);
  }
}