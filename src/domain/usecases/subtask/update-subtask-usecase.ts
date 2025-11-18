import { Injectable, inject } from '@angular/core';
import { SubtaskModel } from '../../models/subtask/subtask-model';
import { SubtaskRepository } from '../../repositories/subtask-repository';

@Injectable({ providedIn: 'root' })
export class UpdateSubtaskUseCase {
  private subtaskRepository = inject(SubtaskRepository);

  execute(id: string, model: SubtaskModel): Promise<SubtaskModel>  {
     return this.subtaskRepository.updateSubtask(id, model);
  }
}
