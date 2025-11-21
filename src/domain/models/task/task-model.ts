import { SubtaskModel } from "../subtask/subtask-model";
import { TagModel } from "../tag/tag-model";
import { CategoryModel } from "../category/category-model";

export interface TaskModel {
  id: string;
  title: string;
  description?: string;
  dueDate: string | Date;
  status: TaskStatus;
  userId: string;
  subtasks?: SubtaskModel[];
  categories?: CategoryModel[];
  tags?: TagModel[];
}

export type TaskStatus =
  | 'Non Started'
  | 'In Progress'
  | 'Paused'
  | 'Late'
  | 'Finished';