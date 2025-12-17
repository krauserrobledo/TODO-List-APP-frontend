import { Injectable, inject } from '@angular/core';
import { TaskRepository } from '../../i-repositories/task-repository';
import { TaskModel } from '../../models/task/task-model';
import { Observable } from 'rxjs';

/**
 * Use case for retrieving a task by its ID.
 */
@Injectable({ providedIn: 'root' })
export class GetTaskUseCase {
  private taskRepository = inject(TaskRepository);

  execute(id : string): Observable <TaskModel> {
    return this.taskRepository.getTask(id);
  }
}
