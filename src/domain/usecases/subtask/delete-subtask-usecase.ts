import { Injectable, inject } from '@angular/core';
import { TagModel } from '../../models/tag/tag-model';
import { SubtaskRepository } from '../../repositories/subtask-repository';

@Injectable({ providedIn: 'root' })
export class DeleteSubtaskUseCase {
  private subtaskRepository = inject(SubtaskRepository);

  execute(model: TagModel): void {
    this.subtaskRepository.deleteSubtask(model.id);
  }
}
