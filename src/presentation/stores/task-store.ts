import { inject, Injectable, signal } from '@angular/core';
import { TaskModel } from '../../domain/models/task/task-model';
import { TaskService } from '../components/task/service/task-service';

@Injectable({ providedIn: 'root' })
export class TaskStore {
  private taskService = inject(TaskService);

  // Estado reactivo
  tasks = signal<TaskModel[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  // CRUD
  async loadTasks() {
    this.isLoading.set(true);
    try {
      const result = await this.taskService.getUserTasks();
      this.tasks.set(result);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }

  async createTask(model: TaskModel) {
    try {
      const newTask = await this.taskService.createTask(model);
      this.tasks.update(tasks => [...tasks, newTask]);
    } catch (err: any) {
      this.error.set(err.message);
    }
  }

  async updateTask(id: string, model: TaskModel) {
    try {
      const updatedTask = await this.taskService.updateTask(id, model);
      this.tasks.update(tasks =>
        tasks.map(t => (t.id === id ? updatedTask : t))
      );
    } catch (err: any) {
      this.error.set(err.message);
    }
  }

  async deleteTask(id: string) {
    try {
      await this.taskService.deleteTask(id);
      this.tasks.update(tasks => tasks.filter(t => t.id !== id));
    } catch (err: any) {
      this.error.set(err.message);
    }
  }

  async addCategory(taskId: string, categoryId: string) {
    try {
       await this.taskService.addCategory(taskId, categoryId);

    } catch (err: any) {
      this.error.set(err.message);
    }
  }

  async addTag(taskId: string, tagId: string) {
    try {
      await this.taskService.addTag(taskId, tagId);

    } catch (err: any) {
      this.error.set(err.message);
    }
  }

  async deleteCategory(taskId: string, categoryId: string) {
    try {
      await this.taskService.deleteCategory(taskId, categoryId);

    } catch (err: any) {
      this.error.set(err.message);
    }
  }

  async deleteTag(taskId: string, tagId: string) {
    try {
       await this.taskService.deleteTag(taskId, tagId);

    } catch (err: any) {
      this.error.set(err.message);
    }
  }
}
