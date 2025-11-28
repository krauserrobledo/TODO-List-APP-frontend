import { TagModel } from "./tag-model";

export interface TagStateModel {
    tasks: TagModel[];
    selectedTask: TagModel | null;
    isLoading: boolean;
    error: string | null;
  }