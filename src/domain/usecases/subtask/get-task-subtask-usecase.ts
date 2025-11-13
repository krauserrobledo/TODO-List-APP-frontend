import { Injectable, inject } from '@angular/core';
import { SubtaskRepository } from '../../repositories/subtask-repository';
import { SubtaskModel } from '../../models/subtask/subtask-model';

@Injectable({ providedIn: 'root' })
export class GetTaskSubtaskUseCase {
  private tagRepository = inject(SubtaskRepository);

  execute(model: SubtaskModel): Promise <SubtaskModel[]> {
    return this.tagRepository.getTaskSubtasks(model.taskId);
  }
}
