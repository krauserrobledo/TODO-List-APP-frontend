import { TagModel } from "./tag-model";

export interface TagStateModel {
    tags: TagModel[];
    selectedTag: TagModel | null;
    isLoading: boolean;
    error: string | null;
  }