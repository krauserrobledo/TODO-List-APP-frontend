import { Injectable, inject } from '@angular/core';
import { SubtaskRepository } from '../../repositories/subtask-repository';
import { SubtaskModel } from '../../models/subtask/subtask-model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetTaskSubtasksUseCase {
  private tagRepository = inject(SubtaskRepository);

  execute(taskId: string): Observable <SubtaskModel[]> {
    return this.tagRepository.getTaskSubtasks(taskId);
  }
}
