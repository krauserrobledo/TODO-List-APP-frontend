import { TaskModel } from "./task-model";

/**
 * Model representing the state of tasks.
 */
export interface TaskStateModel {
    tasks: TaskModel[];
    selectedTask: TaskModel | null;
    isLoading: boolean;
    error: string | null;
  }
