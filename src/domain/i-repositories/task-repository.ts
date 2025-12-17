import { Observable } from "rxjs";
import { TaskModel } from "../models/task/task-model";

/**
 * Abstract repository interface for managing tasks.
 */
export abstract class TaskRepository {

  abstract createTask(category: TaskModel): Observable<TaskModel>;
  abstract updateTask(id: string, task: TaskModel): Observable<TaskModel>;
  abstract deleteTask(id: string): Observable<void>;
  abstract getTask(id: string): Observable<TaskModel>;
  abstract getUserTasks(): Observable<TaskModel[]>;
  abstract addCategoryToTask(taskId: string, categoryId: string): Observable<TaskModel>;
  abstract addTagToTask(taskId: string, tagId: string): Observable<TaskModel>;
  abstract deleteCategoryFromTask(taskId: string, categoryId: string): Observable<TaskModel>;
  abstract deleteTagFromTask(taskId: string, tagId: string): Observable<TaskModel>;
}
