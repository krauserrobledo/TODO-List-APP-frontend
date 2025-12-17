import { SubtaskModel } from "./subtask-model";

/**
 * Model representing the state of subtasks.
 */
export interface SubtaskStateModel {
  subtasks: SubtaskModel[];
  selectedSubtask: SubtaskModel | null;
  isLoading: boolean;
  error: string | null;
}
