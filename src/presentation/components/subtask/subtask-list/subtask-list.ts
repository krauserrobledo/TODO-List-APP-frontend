import { CommonModule } from '@angular/common';
import { Component, OnChanges, Input, inject } from '@angular/core';
import { SubtaskStore } from '../../../stores/subtask-store';
import { SubtaskModel } from '../../../../domain/models/subtask/subtask-model';
import { FormsModule } from '@angular/forms';
import { Dialog } from "primeng/dialog";
import { Button } from "primeng/button";
import { InputTextModule } from 'primeng/inputtext';
import { Chip } from "primeng/chip";

@Component({
  selector: 'app-subtask-list',
  standalone: true,
  imports: [CommonModule, FormsModule, Dialog, Button, InputTextModule, Chip],
  templateUrl: './subtask-list.html',
  styleUrls: ['./subtask-list.css']
})
export class SubtaskList implements OnChanges {
  @Input() taskId: string | null = null;
  store = inject(SubtaskStore);
  title = '';
  showCreateDialog = false;

  submit() {
    if (!this.title.trim() || !this.taskId) return;

    const model: SubtaskModel = {
      id: crypto.randomUUID(),
      title: this.title,
      taskId: this.taskId
    };

    this.store.createSubtask(model);
    this.title = '';
  }

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
  openDialog() {
    this.showCreateDialog = true;
  }
}
