import { Component, EventEmitter, Output, Input, OnChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskModel } from '../../../../domain/models/task/task-model';
import { CategoryModel } from '../../../../domain/models/category/category-model';
import { TagModel } from '../../../../domain/models/tag/tag-model';
import { CategoryStore } from '../../../stores/category-store';
import { TagStore } from '../../../stores/tag-store';
import { TaskStore } from '../../../stores/task-store';  
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
    InputTextModule
  ],
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

  // Stores 
  storeCategories = inject(CategoryStore);
  storeTags = inject(TagStore);
  taskStore = inject(TaskStore);

  ngOnInit() {
    this.storeCategories.loadCategories();
    this.storeTags.loadTags();
  }

  ngOnChanges() {
    if (this.task) {
      this.isEdit = true;
      this.id = this.task.id;
      this.newTitle = this.task.title;
      this.newDescription = this.task.description ?? "";
      this.newStatus = this.task.status;

      const d = new Date(this.task.dueDate);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      this.newDueDate = `${yyyy}-${mm}-${dd}`;

      this.categories = this.task.categories ?? [];
      this.tags = this.task.tags ?? [];
    } else {
      this.resetForm();
      this.isEdit = false;
    }
  }

  submit() {
    if (!this.newTitle.trim() || !this.newDescription.trim()) return;

    const updatedCategories = this.categories ?? [];
    const updatedTags = this.tags ?? [];

    const originalCategories = this.task?.categories ?? [];
    const originalTags = this.task?.tags ?? [];

    const addedCategories = updatedCategories.filter(c => !originalCategories.some(o => o.id === c.id));
    const removedCategories = originalCategories.filter(o => !updatedCategories.some(c => c.id === o.id));

    const addedTags = updatedTags.filter(t => !originalTags.some(o => o.id === t.id));
    const removedTags = originalTags.filter(o => !updatedTags.some(t => t.id === o.id));

    if (this.id) {
      addedCategories.forEach(c => this.taskStore.addCategory(this.id!, c.id));
      removedCategories.forEach(c => this.taskStore.deleteCategory(this.id!, c.id));

      addedTags.forEach(t => this.taskStore.addTag(this.id!, t.id));
      removedTags.forEach(t => this.taskStore.deleteTag(this.id!, t.id));
    }

    const model: TaskModel = {
      id: this.id ?? crypto.randomUUID(),
      title: this.newTitle,
      description: this.newDescription,
      status: this.newStatus,
      dueDate: new Date(this.newDueDate),
      userId: this.task?.userId ?? '',
      categories: updatedCategories,
      tags: updatedTags
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
