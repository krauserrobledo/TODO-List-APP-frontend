import { Injectable, inject } from '@angular/core';
import { TagModel } from '../../models/tag/tag-model';
import { TaskRepository } from '../../repositories/task-repository';
import { TaskModel } from '../../models/task/task-model';

@Injectable({ providedIn: 'root' })
export class GetTaskUseCase {
  private taskRepository = inject(TaskRepository);

  execute(model: TaskModel): Promise <TaskModel> {
    return this.taskRepository.getTask(model.id);
  }
}
