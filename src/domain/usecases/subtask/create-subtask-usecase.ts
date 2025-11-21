import { Injectable, inject } from '@angular/core';
import { SubtaskRepository } from '../../repositories/subtask-repository';
import { SubtaskModel } from '../../models/subtask/subtask-model';

@Injectable({ providedIn: 'root' })
export class CreateSubtaskUseCase {
  constructor(private repository: SubtaskRepository) {}

  execute(taskId: string, model: SubtaskModel): Promise<SubtaskModel> {
    return this.repository.createSubtask(taskId, model);
  }
}
