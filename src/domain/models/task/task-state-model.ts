import { TaskModel } from "./task-model";

export interface TaskStateModel {
    tasks: TaskModel[];
    selectedTask: TaskModel | null;
    isLoading: boolean;
    error: string | null;
  }