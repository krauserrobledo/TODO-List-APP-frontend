import { Injectable, inject } from '@angular/core';
import { SubtaskRepository } from '../../i-repositories/subtask-repository';
import { SubtaskModel } from '../../models/subtask/subtask-model';
import { Observable } from 'rxjs';

/**
 * Use case for retrieving all subtasks under a specific task.
 */
@Injectable({ providedIn: 'root' })
export class GetTaskSubtasksUseCase {
  private tagRepository = inject(SubtaskRepository);

  execute(taskId: string): Observable<SubtaskModel[]> {
    return this.tagRepository.getTaskSubtasks(taskId);
  }
}
