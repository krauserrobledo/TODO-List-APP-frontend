import { Component, EventEmitter, Output, Input, OnChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskModel } from '../../../../domain/models/task/task-model';
import { CategoryModel } from '../../../../domain/models/category/category-model';
import { TagModel } from '../../../../domain/models/tag/tag-model';
import { CategoryStore } from '../../../stores/category';
import { TagStore } from '../../../stores/tag';
import { TaskStore } from '../../../stores/task';  
import { Button } from "primeng/button";
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Button,
    MultiSelectModule,
    SelectButtonModule,
    DatePickerModule,
    TextareaModule,
    InputTextModule,
    ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css'],
})
export class TaskForm implements OnChanges {
  @Input() task: TaskModel | null = null;

  @Output() create = new EventEmitter<TaskModel>();
  @Output() update = new EventEmitter<TaskModel>();
  @Output() delete = new EventEmitter<TaskModel>();
  @Output() cancel = new EventEmitter<void>();

  id: string | null = null;
  newTitle: string = '';
  newDescription: string = '';
  newStatus: TaskModel['status'] = 'Non Started';
  newDueDate: string = '';
  categories: CategoryModel[] = [];
  tags: TagModel[] = [];
  isEdit = false;  
  taskForm!: FormGroup;

  // Stores 
  storeCategories = inject(CategoryStore);
  storeTags = inject(TagStore);
  taskStore = inject(TaskStore);

   constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      newTitle: ['', Validators.required],
      newDescription: [''],
      newStatus: ['Non Started', Validators.required],
      newDueDate: [null, Validators.required],
      categories: [[]],
      tags: [[]]
   })
  }

  ngOnInit() {
    this.storeCategories.loadCategories();
    this.storeTags.loadTags();

    this.taskForm = this.fb.group({
      newTitle: ['', Validators.required],
      newDescription: [''],
      newStatus: ['Non Started', Validators.required],
      newDueDate: [null, Validators.required],
      categories: [[]],
      tags: [[]]
    });
  }

  ngOnChanges() {
    if (this.task) {
      this.isEdit = true;
      this.taskForm.patchValue({
        newTitle: this.task.title,
        newDescription: this.task.description ?? '',
        newStatus: this.task.status,
        newDueDate: new Date(this.task.dueDate),
        categories: this.task.categories ?? [],
        tags: this.task.tags ?? []
      });
    } else {
      this.taskForm.reset({
        newStatus: 'Non Started',
        categories: [],
        tags: []
      });
      this.isEdit = false;
    }
  }

  submit() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const model: TaskModel = {
      id: this.task?.id ?? crypto.randomUUID(),
      ...this.taskForm.value,
      userId: this.task?.userId ?? '',
      title: '',
      dueDate: '',
      status: 'Non Started'
    };

    if (this.isEdit) {
      this.update.emit(model);
    } else {
      this.create.emit(model);
    }
  }


  remove() {
    if (this.task) this.delete.emit(this.task);
  }

  resetForm() {
    this.id = null;
    this.newTitle = '';
    this.newDescription = '';
    this.newStatus = 'Non Started';
    this.newDueDate = '';
    this.categories = [];
    this.tags = [];
  }

  close() {
    this.cancel.emit();
  }
}
