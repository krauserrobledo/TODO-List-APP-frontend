import { Injectable, inject } from "@angular/core";
import { TaskModel } from "../../models/task/task-model";
import { TaskRepository } from "../../i-repositories/task-repository";
import { Observable } from "rxjs";

/**
 * Use case for deleting a category from a task.
 */
@Injectable({ providedIn: 'root' })
export class DeleteCategoryFromTaskUseCase {
  private taskRepository = inject(TaskRepository);

  execute(taskId: string, categoryId: string): Observable<TaskModel> {
    return this.taskRepository.deleteCategoryFromTask(taskId, categoryId);
  }
}
