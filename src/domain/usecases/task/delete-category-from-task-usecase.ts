import { Injectable, inject } from "@angular/core";
import { TaskModel } from "../../models/task/task-model";
import { TaskRepository } from "../../repositories/task-repository";

@Injectable({ providedIn: 'root' })
export class DeleteCategoryFromTaskUseCase {
  private taskRepository = inject(TaskRepository);

  execute(taskId: string, categoryId: string): Promise<TaskModel> {
    return this.taskRepository.deleteCategoryFromTask(taskId, categoryId);
  }
}
