import { TaskModel } from "../models/task/task-model";

export abstract class TaskRepository {

  abstract createTask(category: TaskModel): Promise<TaskModel>;
  abstract updateTask(id: string, task: TaskModel): Promise<TaskModel>;
  abstract deleteTask(id: string): Promise<void>;
  abstract getTask(id: string): Promise<TaskModel>;
  abstract getUserTasks(): Promise<TaskModel[]>;
  abstract addCategoryToTask(taskId: string, categoryId: string): Promise<TaskModel>;
  abstract addTagToTask(taskId: string, tagId: string): Promise<TaskModel>;
  abstract deleteCategoryFromTask(taskId: string, categoryId: string): Promise<TaskModel>;
  abstract deleteTagFromTask(taskId: string, tagId: string): Promise<TaskModel>;

}
