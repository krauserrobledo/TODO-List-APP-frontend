import { Injectable, inject } from '@angular/core';
import { SubtaskRepository } from '../../repositories/subtask-repository';
import { SubtaskModel } from '../../models/subtask/subtask-model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CreateSubtaskUseCase {
  constructor(private repository: SubtaskRepository) {}

  execute(taskId: string, model: SubtaskModel): Observable<SubtaskModel> {
    return this.repository.createSubtask(taskId, model);
  }
}
