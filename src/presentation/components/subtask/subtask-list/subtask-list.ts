import { CommonModule } from "@angular/common";
import { Component, OnChanges, Input, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SubtaskModel } from "../../../../domain/models/subtask/subtask-model";
import { SubtaskStore } from "../../../stores/subtask-store";

@Component({
  selector: 'app-subtask-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subtask-list.html',
  styleUrls: ['./subtask-list.css']
})
export class SubtaskList implements OnChanges {
  @Input() taskId: string | null = null;
  store = inject(SubtaskStore);
  newTitle = '';

  ngOnChanges() {
    if (this.taskId) {
      this.store.loadSubtasks(this.taskId);
    }
  }

  addSubtask() {
    if (!this.newTitle.trim() || !this.taskId) return;

    const model: SubtaskModel = {
      id: crypto.randomUUID(),
      title: this.newTitle,
      taskId: this.taskId
    };

    this.store.createSubtask(model);
    this.newTitle = '';
  }

  deleteSubtask(id: string) {
    this.store.deleteSubtask(id);
  }
}
