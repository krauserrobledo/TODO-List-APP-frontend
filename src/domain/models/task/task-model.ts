import { SubtaskModel } from "../subtask/subtask-model";
import { TagModel } from "../tag/tag-model";
import { CategoryModel } from "../category/category-model";

export interface TaskModel {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  status: TaskStatus;
  userId: string;
  subtasks?: SubtaskModel[];
  categories?: CategoryModel[];
  tags?: TagModel[];
}

export type TaskStatus =
  | 'non_started'
  | 'in_progress'
  | 'paused'
  | 'late'
  | 'finished';