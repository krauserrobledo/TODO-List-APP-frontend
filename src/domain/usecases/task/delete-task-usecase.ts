import { Injectable, inject } from '@angular/core';
import { TaskRepository } from '../../repositories/task-repository';

@Injectable({ providedIn: 'root' })
export class DeleteTaskUseCase {
  private taskRepository = inject(TaskRepository);

  execute(id: string): void {
    this.taskRepository.deleteTask(id);
  }
}
