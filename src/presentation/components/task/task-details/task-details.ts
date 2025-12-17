import { Component, Input, Output, EventEmitter, OnChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskModel } from '../../../../domain/models/task/task-model';
import { SubtaskList } from "../../subtask/subtask-list/subtask-list";
import { SelectButtonModule } from 'primeng/selectbutton';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TaskForm } from '../task-form/task-form';
import { Store } from '@ngxs/store';
import { AddCategoryToTask, DeleteCategoryFromTask, AddTagToTask, DeleteTagFromTask, UpdateTask } from '../../../stores/task/task.actions';
import { CategoryState } from '../../../stores/category/category.state';
import { TagState } from '../../../stores/tag/tag.state';

/**
 * Component for displaying and managing the details of a task.
 * Allows viewing and editing task information, changing status,
 * and managing associated categories and tags.
 * Integrates with NGXS store for state management.
 * @see TaskModel
 * @see SubtaskList
 * @see TaskForm
 * @see AddCategoryToTask
 * @see DeleteCategoryFromTask
 * @see AddTagToTask
 * @see DeleteTagFromTask
 * @see UpdateTask
 * @see CategoryState
 * @see TagState
 */
@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [
    CommonModule, FormsModule, SubtaskList,
    SelectButtonModule, ChipModule, ButtonModule,
    DialogModule, TaskForm
  ],
  templateUrl: './task-details.html',
  styleUrls: ['./task-details.css']
})

export class TaskDetails implements OnChanges {
  @Input() task: TaskModel | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() changeStatus = new EventEmitter<{ task: TaskModel; status: TaskModel['status'] }>();
  @Output() delete = new EventEmitter<TaskModel>();
  @Output() update = new EventEmitter<TaskModel>();

  private store = inject(Store);

  selectedStatus: TaskModel['status'] = 'Non Started';
  showEditDialog = false;
  showCategoryDialog = false;
  showTagDialog = false;
  allCategories = this.store.selectSnapshot(CategoryState.categories);
  allTags = this.store.selectSnapshot(TagState.tags);
  statusOptions = [
    { label: 'Non Started', value: 'Non Started' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Paused', value: 'Paused' },
    { label: 'Late', value: 'Late' },
    { label: 'Finished', value: 'Finished' }
  ];

  // Update selectedStatus when task input changes
  ngOnChanges() {
    if (this.task) {
      this.selectedStatus = this.task.status;
    }
  }

  // on Update task form submission
  onUpdate(updated: TaskModel) {
    this.store.dispatch(new UpdateTask(updated.id, updated)).subscribe(() => {
      const refreshed = this.store.selectSnapshot(state =>
        state.tasks.tasks.find((t: TaskModel) => t.id === updated.id)
      );

      if (refreshed) {
        this.task = refreshed;
        this.update.emit(refreshed);
      }

      this.showEditDialog = false;
    });
  }

  /** ---------------------
  * CATEGORY MANAGEMENT
  -------------------------**/
  // Remove a category from the task
  removeCategory(categoryId: string) {
    if (!this.task) return;

    this.store.dispatch(
      new DeleteCategoryFromTask(this.task.id, categoryId)
    ).subscribe(() => {
      const updated = this.store.selectSnapshot(state =>
        state.tasks.tasks.find((t: { id: string; }) => t.id === this.task!.id)
      );

      if (updated) {
        this.task = updated;
        this.update.emit(updated);
      }
    });
  }

  // Add a category to the task
  addCategory(categoryId: string) {
    if (!this.task) return;

    this.store.dispatch(
      new AddCategoryToTask(this.task.id, categoryId)
    ).subscribe(() => {
      const updated = this.store.selectSnapshot(state =>
        state.tasks.tasks.find((t: { id: string; }) => t.id === this.task!.id)
      );

      if (updated) {
        this.task = updated;
        this.update.emit(updated);
      }

      this.showCategoryDialog = false;
    });
  }

  /** -------------------------
  * TAG MANAGEMENT
   -------------------------**/
   // Remove a tag from the task
  removeTag(tagId: string) {
    if (!this.task) return;

    this.store.dispatch(
      new DeleteTagFromTask(this.task.id, tagId)
    ).subscribe(() => {
      const updated = this.store.selectSnapshot(state =>
        state.tasks.tasks.find((t: { id: string; }) => t.id === this.task!.id)
      );

      if (updated) {
        this.task = updated;
        this.update.emit(updated);
      }
    });
  }

  // Add a tag to the task
  addTag(tagId: string) {
    if (!this.task) return;

    this.store.dispatch(
      new AddTagToTask(this.task.id, tagId)
    ).subscribe(() => {
      const updated = this.store.selectSnapshot(state =>
        state.tasks.tasks.find((t: { id: string; }) => t.id === this.task!.id)
      );

      if (updated) {
        this.task = updated;
        this.update.emit(updated);
      }

      this.showTagDialog = false;
    });
  }

  // Get CSS class based on task status
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
