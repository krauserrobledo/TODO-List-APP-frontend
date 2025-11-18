import { Injectable, inject } from '@angular/core';
import { SubtaskRepository } from '../../repositories/subtask-repository';
import { SubtaskModel } from '../../models/subtask/subtask-model';

@Injectable({ providedIn: 'root' })
export class GetTaskSubtasksUseCase {
  private tagRepository = inject(SubtaskRepository);

  execute(taskId: string): Promise <SubtaskModel[]> {
    return this.tagRepository.getTaskSubtasks(taskId);
  }
}
