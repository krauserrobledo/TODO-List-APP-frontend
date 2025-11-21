import { Component, EventEmitter, Output, Input, OnChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskModel } from '../../../../domain/models/task/task-model';
import { CategoryModel } from '../../../../domain/models/category/category-model';
import { TagModel } from '../../../../domain/models/tag/tag-model';
import { CategoryStore } from '../../../stores/category-store';
import { TagStore } from '../../../stores/tag-store';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  categories?: CategoryModel[] | null;
  tags?: TagModel[] | null ;

  isEdit = false;
  
  storeCategories = inject(CategoryStore);
storeTags = inject(TagStore);
model: TaskModel | null = null;

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
    } else {
      this.resetForm();
      this.isEdit = false;
    }
  }

  submit() {
    if (!this.newTitle.trim() || !this.newDescription.trim()) return;

    const model: TaskModel = {
      id: this.id ?? crypto.randomUUID(),
      title: this.newTitle,
      description: this.newDescription,
      status: this.newStatus,
      dueDate: new Date(this.newDueDate),
      userId: this.task?.userId ?? '',
      categories: this.categories?? undefined,
      tags: this.tags?? undefined
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
  }

  close() {
    this.cancel.emit();
  }
}
