import { inject, Injectable } from "@angular/core";
import { TaskModel } from "../../models/task/task-model";
import { TaskRepository } from "../../repositories/task-repository";

@Injectable({ providedIn: 'root' })
export class GetUserTasksUseCase {
  private taskRepository = inject(TaskRepository);

  execute(): Promise <TaskModel[]> {
    return this.taskRepository.getUserTasks();
  }
}
