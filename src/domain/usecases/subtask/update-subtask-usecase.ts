import { Injectable, inject } from '@angular/core';
import { SubtaskModel } from '../../models/subtask/subtask-model';
import { SubtaskRepository } from '../../repositories/subtask-repository';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UpdateSubtaskUseCase {
  private subtaskRepository = inject(SubtaskRepository);

  execute(id: string, model: SubtaskModel): Observable<SubtaskModel>  {
     return this.subtaskRepository.updateSubtask(id, model);
  }
}
