import { CommonModule } from '@angular/common';
import { Component, OnChanges, Input, inject } from '@angular/core';
import { SubtaskStore } from '../../../stores/subtask-store';
import { SubtaskForm } from '../subtask-form/subtask-form';

@Component({
  selector: 'app-subtask-list',
  standalone: true,
  imports: [CommonModule, SubtaskForm],
  templateUrl: './subtask-list.html',
  styleUrls: ['./subtask-list.css']
})
export class SubtaskList implements OnChanges {
  @Input() taskId: string | null = null;
  store = inject(SubtaskStore);

  ngOnChanges() {
    if (this.taskId) {
      this.store.loadSubtasks(this.taskId);
    }
  }

  createSubtask(model: any) {
    this.store.createSubtask(model);
  }

  deleteSubtask(id: string) {
    this.store.deleteSubtask(id);
  }
}
