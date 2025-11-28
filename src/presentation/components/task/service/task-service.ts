import { Injectable } from "@angular/core";
import { CreateTaskUseCase } from "../../../../domain/usecases/task/create-task-usecase";
import { AddCategoryToTaskUseCase } from "../../../../domain/usecases/task/add-category-to-task-usecase";
import { AddTagToTaskUseCase } from "../../../../domain/usecases/task/add-tag-to-task-usecase";
import { DeleteCategoryFromTaskUseCase } from "../../../../domain/usecases/task/delete-category-from-task-usecase";
import { DeleteTagFromTaskUseCase } from "../../../../domain/usecases/task/delete-tag-from-task-usecase";
import { DeleteTaskUseCase } from "../../../../domain/usecases/task/delete-task-usecase";
import { GetTaskUseCase } from "../../../../domain/usecases/task/get-task-usecase";
import { GetUserTasksUseCase } from "../../../../domain/usecases/task/get-user-tasks-usecase";
import { UpdateTaskUseCase } from "../../../../domain/usecases/task/update-task-usecase";
import { TaskModel } from "../../../../domain/models/task/task-model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(
    private createUseCase: CreateTaskUseCase,
    private updateUseCase: UpdateTaskUseCase,
    private deleteUseCase: DeleteTaskUseCase,
    private getTaskUseCase: GetTaskUseCase,
    private getUserTasksUseCase: GetUserTasksUseCase,
    private addCategoryUseCase: AddCategoryToTaskUseCase,
    private addTagUseCase: AddTagToTaskUseCase,
    private deleteCategoryUseCase: DeleteCategoryFromTaskUseCase,
    private deleteTagUseCase: DeleteTagFromTaskUseCase
  ) {}

  createTask(model: TaskModel): Observable<TaskModel> {
    return this.createUseCase.execute(model);
  }

  updateTask(id: string, model: TaskModel): Observable<TaskModel> {
    return this.updateUseCase.execute(id, model);
  }

  deleteTask(id: string): Observable<void> {
    return this.deleteUseCase.execute(id);
  }

  getTask(id: string): Observable<TaskModel> {
    return this.getTaskUseCase.execute(id);
  }

  getUserTasks(): Observable<TaskModel[]> {
    return this.getUserTasksUseCase.execute();
  }

  addCategory(taskId: string, categoryId: string): Observable<TaskModel> {
    return this.addCategoryUseCase.execute(taskId, categoryId);
  }

  addTag(taskId: string, tagId: string): Observable<TaskModel> {
    return this.addTagUseCase.execute(taskId, tagId);
  }

  deleteCategory(taskId: string, categoryId: string): Observable<TaskModel> {
    return this.deleteCategoryUseCase.execute(taskId, categoryId);
  }

  deleteTag(taskId: string, tagId: string): Observable<TaskModel> {
    return this.deleteTagUseCase.execute(taskId, tagId);
  }
}
