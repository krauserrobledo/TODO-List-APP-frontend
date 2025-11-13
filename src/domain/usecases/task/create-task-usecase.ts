import { inject, Injectable } from "@angular/core";
import { TaskModel } from "../../models/task/task-model";
import { TaskRepository } from "../../repositories/task-repository";

@Injectable({ providedIn: 'root' })
export class CreateTaskUseCase {
  private taskRepository = inject(TaskRepository);

  execute(model: TaskModel): Promise <TaskModel> {
    return this.taskRepository.createTask(model);
  }
}
