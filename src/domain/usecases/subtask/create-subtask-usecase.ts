import { Injectable, inject } from '@angular/core';
import { SubtaskRepository } from '../../repositories/subtask-repository';
import { SubtaskModel } from '../../models/subtask/subtask-model';

@Injectable({ providedIn: 'root' })
export class CreateSubtaskUseCase {
  private subtaskRepository = inject(SubtaskRepository);

  execute(model: SubtaskModel): void {
    this.subtaskRepository.createSubtask(model.taskId, model);
  }
}
