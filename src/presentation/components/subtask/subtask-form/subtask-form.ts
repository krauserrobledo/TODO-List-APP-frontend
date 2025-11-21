import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SubtaskModel } from '../../../../domain/models/subtask/subtask-model';

@Component({
  selector: 'app-subtask-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subtask-form.html',
  styleUrls: ['./subtask-form.css']
})
export class SubtaskForm {
  @Input() taskId!: string;
  @Output() create = new EventEmitter<SubtaskModel>();

  title = '';

  submit() {
    if (!this.title.trim() || !this.taskId) return;

    const model: SubtaskModel = {
      id: crypto.randomUUID(),
      title: this.title,
      taskId: this.taskId
    };

    this.create.emit(model);
    this.title = '';
  }
}
