import { Injectable, inject } from '@angular/core';
import { SubtaskRepository } from '../../repositories/subtask-repository';
import { SubtaskModel } from '../../models/subtask/subtask-model';

@Injectable({ providedIn: 'root' })
export class GetSubtaskUseCase {
  private subtaskRepository = inject(SubtaskRepository);

  execute(model: SubtaskModel): Promise <SubtaskModel> {
    return this.subtaskRepository.getSubtask(model.id);
  }
}
