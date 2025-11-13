import { Injectable, inject } from '@angular/core';
import { TaskRepository } from '../../repositories/task-repository';

@Injectable({ providedIn: 'root' })
export class DeleteTagFromTaskUseCase {
  private taskRepository = inject(TaskRepository);

  execute(taskId: string, tagId: string): Promise<void> {
    return this.taskRepository.deleteTagFromTask(taskId, tagId);
  }
}
