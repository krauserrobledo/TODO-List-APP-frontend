import { Injectable, inject } from '@angular/core';
import { SubtaskRepository } from '../../i-repositories/subtask-repository';
import { SubtaskModel } from '../../models/subtask/subtask-model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetSubtaskUseCase {
  private subtaskRepository = inject(SubtaskRepository);

  execute(id: string): Observable <SubtaskModel> {
    return this.subtaskRepository.getSubtask(id);
  }
}
