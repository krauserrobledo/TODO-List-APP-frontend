import { Injectable, inject } from '@angular/core';
import { TaskRepository } from '../../repositories/task-repository';

@Injectable({ providedIn: 'root' })
export class DeleteCategoryFromTaskUseCase {
  private taskRepository = inject(TaskRepository);

  execute(taskId: string, categoryId: string): Promise<void> {
    return this.taskRepository.deleteCategoryFromTask(taskId, categoryId);
  }
}
