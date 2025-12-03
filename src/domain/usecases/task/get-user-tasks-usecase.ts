import { inject, Injectable } from "@angular/core";
import { TaskModel } from "../../models/task/task-model";
import { TaskRepository } from "../../i-repositories/task-repository";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class GetUserTasksUseCase {
  private taskRepository = inject(TaskRepository);

  execute(): Observable <TaskModel[]> {
    return this.taskRepository.getUserTasks();
  }
}
