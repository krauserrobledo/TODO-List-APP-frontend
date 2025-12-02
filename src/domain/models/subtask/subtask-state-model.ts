import { SubtaskModel } from "./subtask-model";

export interface SubtaskStateModel {
    subtasks: SubtaskModel[];
    selectedSubtask: SubtaskModel | null;
    isLoading: boolean;
    error: string | null;
  }