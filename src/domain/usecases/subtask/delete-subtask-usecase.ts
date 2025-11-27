import { Injectable, inject } from '@angular/core';
import { SubtaskRepository } from '../../repositories/subtask-repository';

@Injectable({ providedIn: 'root' })
export class DeleteSubtaskUseCase {
  private subtaskRepository = inject(SubtaskRepository);

  execute(id: string): void {
    this.subtaskRepository.deleteSubtask(id);
  }
}
