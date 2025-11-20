import { Injectable, inject } from '@angular/core';
import { TaskRepository } from '../../repositories/task-repository';
import { TaskModel } from '../../models/task/task-model';

@Injectable({ providedIn: 'root' })
export class GetTaskUseCase {
  private taskRepository = inject(TaskRepository);

  execute(id : string): Promise <TaskModel> {
    return this.taskRepository.getTask(id);
  }
}
