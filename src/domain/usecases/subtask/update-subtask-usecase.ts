import { Injectable, inject } from '@angular/core';
import { SubtaskModel } from '../../models/subtask/subtask-model';
import { SubtaskRepository } from '../../repositories/subtask-repository';

@Injectable({ providedIn: 'root' })
export class UpdateSubtaskUseCase {
  private subtaskRepository = inject(SubtaskRepository);

  execute(model: SubtaskModel): void {
    this.subtaskRepository.updateSubtask(model.id, model);
  }
}
