import { SubtaskModel } from "../subtask/subtask-model";
import { TagModel } from "../tag/tag-model";
import { CategoryModel } from "../category/category-model";

export interface TaskModel {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  status: string;
  userId: string;
  subtasks?: SubtaskModel[];
  categories?: CategoryModel[];
  tags?: TagModel[];
}