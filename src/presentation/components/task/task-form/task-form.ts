import { Component, EventEmitter, Output, Input, OnChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskModel } from '../../../../domain/models/task/task-model';
import { Button } from "primeng/button";
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { InputTextModule } from 'primeng/inputtext';
import { Store } from '@ngxs/store';
import { LoadCategories } from '../../../stores/category/category.actions';
import { LoadTags } from '../../../stores/tag/tag.actions';
import { map } from 'rxjs';
import { CategoryState } from '../../../stores/category/category.state';
import { TagState } from '../../../stores/tag/tag.state';
import { AddCategoryToTask, DeleteCategoryFromTask, AddTagToTask, DeleteTagFromTask } from '../../../stores/task/task.actions';

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
    ReactiveFormsModule
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

  isEdit = false;
  taskForm!: FormGroup;

  selectedCategories: any[] = [];
  selectedTags: any[] = [];

  store = inject(Store);

  statusOptions = [
    { label: 'Non Started', value: 'Non Started' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Paused', value: 'Paused' },
    { label: 'Late', value: 'Late' },
    { label: 'Finished', value: 'Finished' }
  ];

  categories$ = this.store.select(CategoryState.categories).pipe(
    map(categories => categories ?? [])
  );

  tags$ = this.store.select(TagState.tags).pipe(
    map(tags => tags ?? [])
  );

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      newTitle: ['', Validators.required],
      newDescription: [''],
      newStatus: ['Non Started', Validators.required],
      newDueDate: [null]
    });
  }

  ngOnInit() {
    this.store.dispatch(new LoadCategories());
    this.store.dispatch(new LoadTags());
  }

  ngOnChanges() {
    if (this.task) {
      this.isEdit = true;

      const allCategories = this.store.selectSnapshot(CategoryState.categories) ?? [];
      const allTags = this.store.selectSnapshot(TagState.tags) ?? [];

      this.selectedCategories = (this.task.categories ?? []).map(c =>
        allCategories.find(ac => ac.id === c.id)
      );

      this.selectedTags = (this.task.tags ?? []).map(t =>
        allTags.find(at => at.id === t.id)
      );

      this.taskForm.patchValue({
        newTitle: this.task.title,
        newDescription: this.task.description ?? '',
        newStatus: this.task.status,
        newDueDate: this.task.dueDate ? new Date(this.task.dueDate) : null
      });

    } else {
      this.isEdit = false;
      this.selectedCategories = [];
      this.selectedTags = [];
      this.taskForm.reset({
        newTitle: '',
        newDescription: '',
        newStatus: 'Non Started',
        newDueDate: null
      });
    }
  }

  onCategoriesChanged(selected: any[]) {
    if (!this.task) return;

    const current = this.task.categories ?? [];

    const added = selected.filter(s => !current.some(c => c.id === s.id));
    const removed = current.filter(c => !selected.some(s => s.id === c.id));

    added.forEach(cat =>
      this.store.dispatch(new AddCategoryToTask(this.task!.id, cat.id))
    );

    removed.forEach(cat =>
      this.store.dispatch(new DeleteCategoryFromTask(this.task!.id, cat.id))
    );
  }

  onTagsChanged(selected: any[]) {
    if (!this.task) return;

    const current = this.task.tags ?? [];

    const added = selected.filter(s => !current.some(c => c.id === s.id));
    const removed = current.filter(c => !selected.some(s => s.id === c.id));

    added.forEach(tag =>
      this.store.dispatch(new AddTagToTask(this.task!.id, tag.id))
    );

    removed.forEach(tag =>
      this.store.dispatch(new DeleteTagFromTask(this.task!.id, tag.id))
    );
  }

  submit() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const v = this.taskForm.value;

    const model: TaskModel = {
      id: this.task?.id ?? crypto.randomUUID(),
      userId: this.task?.userId ?? '',
      title: v.newTitle,
      description: v.newDescription ?? '',
      status: v.newStatus,
      dueDate: v.newDueDate ? v.newDueDate.toISOString() : null
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

  close() {
    this.cancel.emit();
  }
}
