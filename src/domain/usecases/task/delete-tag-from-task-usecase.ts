import { Injectable, inject } from '@angular/core';
import { TaskRepository } from '../../repositories/task-repository';
import { TaskModel } from '../../models/task/task-model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DeleteTagFromTaskUseCase {
  private taskRepository = inject(TaskRepository);

  execute(taskId: string, tagId: string): Observable<TaskModel> {
    return this.taskRepository.deleteTagFromTask(taskId, tagId);
  }
}
