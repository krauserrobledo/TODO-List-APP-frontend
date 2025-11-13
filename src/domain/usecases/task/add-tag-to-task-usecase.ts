import { Injectable, inject } from '@angular/core';
import { TaskRepository } from '../../repositories/task-repository';
import { TaskModel } from '../../models/task/task-model';

@Injectable({ providedIn: 'root' })
export class AddTagToTaskUseCase {
  private taskRepository = inject(TaskRepository);

  execute(taskId: string, tagId: string): Promise<TaskModel> {
    return this.taskRepository.addTagToTask(taskId, tagId);
  }
}
