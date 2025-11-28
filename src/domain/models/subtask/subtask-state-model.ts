import { SubtaskModel } from "./subtask-model";

export interface SubtaskStateModel {
    tasks: SubtaskModel[];
    selectedTask: SubtaskModel | null;
    isLoading: boolean;
    error: string | null;
  }