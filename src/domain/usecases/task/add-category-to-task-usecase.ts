import { Injectable, inject } from "@angular/core";
import { TaskModel } from "../../models/task/task-model";
import { TaskRepository } from "../../repositories/task-repository";

@Injectable({ providedIn: 'root' })
export class AddCategoryToTaskUseCase {
  private taskRepository = inject(TaskRepository);

  execute(taskId: string, categoryId: string): Promise<TaskModel> {
    return this.taskRepository.addCategoryToTask(taskId, categoryId);
  }
}
