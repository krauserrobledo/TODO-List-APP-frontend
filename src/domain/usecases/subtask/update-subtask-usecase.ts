import { Injectable, inject } from '@angular/core';
import { SubtaskModel } from '../../models/subtask/subtask-model';
import { SubtaskRepository } from '../../i-repositories/subtask-repository';
import { Observable } from 'rxjs';

/**
 * Use case for updating an existing subtask.
 */
@Injectable({ providedIn: 'root' })
export class UpdateSubtaskUseCase {
  private subtaskRepository = inject(SubtaskRepository);

  execute(id: string, model: SubtaskModel): Observable<SubtaskModel>  {
     return this.subtaskRepository.updateSubtask(id, model);
  }
}
