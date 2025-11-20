import { Injectable, signal } from '@angular/core';
import { SubtaskModel } from '../../domain/models/subtask/subtask-model';
import { SubtaskService } from '../components/subtask/service/subtask-service';
@Injectable({ providedIn: 'root' })
export class SubtaskStore {

  subtasks = signal<SubtaskModel[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  constructor(private service: SubtaskService) {}

  async loadSubtasks(taskId: string) {
    this.isLoading.set(true);
    try {
      const data = await this.service.getTaskTags(taskId);
      this.subtasks.set(data);
    } catch (err: any) {
      this.error.set(err.message ?? 'Error loading subtasks');
    } finally {
      this.isLoading.set(false);
    }
  }

  async createSubtask(model: SubtaskModel) {
    try {
      const created = await this.service.createTag(model);
      this.subtasks.update(list => [...list, created]);
    } catch (err: any) {
      this.error.set(err.message ?? 'Error creating subtask');
    }
  }

  async updateSubtask(id: string, model: SubtaskModel) {
    try {
      const updated = await this.service.updateTag(id, model);
      this.subtasks.update(list =>
        list.map(s => (s.id === id ? updated : s))
      );
    } catch (err: any) {
      this.error.set(err.message ?? 'Error updating subtask');
    }
  }

  async deleteSubtask(id: string) {
    try {
      await this.service.deleteTag(id);
      this.subtasks.update(list => list.filter(s => s.id !== id));
    } catch (err: any) {
      this.error.set(err.message ?? 'Error deleting subtask');
    }
  }
}
