import { Injectable, inject } from "@angular/core";
import { TaskModel } from "../../models/task/task-model";
import { TaskRepository } from "../../i-repositories/task-repository";
import { Observable } from "rxjs";

/**
 * Use case for adding a category to a task.
 */
@Injectable({ providedIn: 'root' })
export class AddCategoryToTaskUseCase {
  private taskRepository = inject(TaskRepository);

  execute(taskId: string, categoryId: string): Observable<TaskModel> {
    return this.taskRepository.addCategoryToTask(taskId, categoryId);
  }
}
