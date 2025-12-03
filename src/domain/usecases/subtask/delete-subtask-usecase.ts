import { Injectable, inject } from '@angular/core';
import { SubtaskRepository } from '../../i-repositories/subtask-repository';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DeleteSubtaskUseCase {
  private subtaskRepository = inject(SubtaskRepository);

  execute(id: string): Observable<void> {
    return this.subtaskRepository.deleteSubtask(id);
  }
}
