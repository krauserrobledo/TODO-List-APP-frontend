import { Component, inject, Input, OnChanges } from '@angular/core';
import { SubtaskStore } from '../../../../stores/subtask-store';
import { CommonModule } from '@angular/common';
import { SubtaskForm } from '../../../subtask/subtask-form/subtask-form';
import { CategoryStore } from '../../../../stores/category-store';
import { TaskStore } from '../../../../stores/task-store';

@Component({
  selector: 'app-task-categories',
  imports: [CommonModule, SubtaskForm],
  templateUrl: './task-categories-list.html',
  styleUrl: './task-categories-list.css',
})
export class TaskCategories implements OnChanges {
    @Input() taskId: string | null = null;
    @Input() tagId: string | null = null;
    cStore = inject(CategoryStore);
    tStore = inject(TaskStore)
  
    ngOnChanges() {
      if (this.taskId) {
        this.tStore.loadTasks(this.taskId);
      }
    }
  
    addTag(taskId: string, tagId:string) {
      this.tStore.addTag(this.taskId?? "", this.tagId?? "");
    }
  
    deleteTag(taskId: string, tagId: string) {
      this.tStore.deleteTag(this.taskId?? "", this.tagId?? "");
    }
  }
  
