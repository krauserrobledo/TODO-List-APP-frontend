import { Injectable, inject } from '@angular/core';
import { TaskRepository } from '../../repositories/task-repository';

@Injectable({ providedIn: 'root' })
export class AddTagToTaskUseCase {
  private taskRepository = inject(TaskRepository);

  execute(taskId: string, tagId: string): Promise<void> {
    return this.taskRepository.addTagToTask(taskId, tagId);
  }
}
