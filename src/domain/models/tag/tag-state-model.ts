import { TagModel } from "./tag-model";

/**
 * Model representing the state of tags.
 */
export interface TagStateModel {
  tags: TagModel[];
  selectedTag: TagModel | null;
  isLoading: boolean;
  error: string | null;
}
