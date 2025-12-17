import { Injectable, inject } from '@angular/core';
import { TaskRepository } from '../../i-repositories/task-repository';
import { TaskModel } from '../../models/task/task-model';
import { Observable } from 'rxjs';

/**
 * Use case for updating an existing task.
 */
@Injectable({ providedIn: 'root' })
export class UpdateTaskUseCase {
  private taskRepository = inject(TaskRepository);

  execute(id: string, model: TaskModel): Observable <TaskModel> {
    return this.taskRepository.updateTask(id, model);
  }
}
