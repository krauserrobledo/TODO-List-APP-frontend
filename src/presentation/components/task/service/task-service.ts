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

/**
 * Service for managing tasks.
 * Provides methods to create, update, delete, and retrieve tasks.
 * Integrates various use cases for task operations.
 * @see CreateTaskUseCase
 * @see UpdateTaskUseCase
 * @see DeleteTaskUseCase
 * @see GetTaskUseCase
 * @see GetUserTasksUseCase
 */
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
  ) { }

  // Create a new task
  createTask(model: TaskModel): Observable<TaskModel> {
    return this.createUseCase.execute(model);
  }

  // Update an existing task
  updateTask(id: string, model: TaskModel): Observable<TaskModel> {
    return this.updateUseCase.execute(id, model);
  }

  // Delete a task by ID
  deleteTask(id: string): Observable<void> {
    return this.deleteUseCase.execute(id);
  }

  // Get a specific task by ID
  getTask(id: string): Observable<TaskModel> {
    return this.getTaskUseCase.execute(id);
  }

  // Get all tasks for the current user
  getUserTasks(): Observable<TaskModel[]> {
    return this.getUserTasksUseCase.execute();
  }

  // Add a category to a task
  addCategory(taskId: string, categoryId: string): Observable<TaskModel> {
    return this.addCategoryUseCase.execute(taskId, categoryId);
  }

  // Add a tag to a task
  addTag(taskId: string, tagId: string): Observable<TaskModel> {
    return this.addTagUseCase.execute(taskId, tagId);
  }

  // Delete a category from a task
  deleteCategory(taskId: string, categoryId: string): Observable<TaskModel> {
    return this.deleteCategoryUseCase.execute(taskId, categoryId);
  }

  // Delete a tag from a task
  deleteTag(taskId: string, tagId: string): Observable<TaskModel> {
    return this.deleteTagUseCase.execute(taskId, tagId);
  }
}
