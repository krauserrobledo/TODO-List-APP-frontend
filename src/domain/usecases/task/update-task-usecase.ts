import { Injectable, inject } from '@angular/core';
import { TaskRepository } from '../../repositories/task-repository';
import { TaskModel } from '../../models/task/task-model';

@Injectable({ providedIn: 'root' })
export class UpdateTaskUseCase {
  private taskRepository = inject(TaskRepository);

  execute(model: TaskModel): void {
    this.taskRepository.updateTask(model.id, model);
  }
}
