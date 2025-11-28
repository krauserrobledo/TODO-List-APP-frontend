import { Injectable, inject } from '@angular/core';
import { TaskRepository } from '../../repositories/task-repository';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DeleteTaskUseCase {
  private taskRepository = inject(TaskRepository);

  execute(id: string): Observable<void> {
    return this.taskRepository.deleteTask(id);
  }
}
