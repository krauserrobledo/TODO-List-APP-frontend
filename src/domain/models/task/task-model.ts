import { SubtaskModel } from "../subtask/subtask-model";
import { TagModel } from "../tag/tag-model";
import { CategoryModel } from "../category/category-model";
import { TaskStatus } from "./task-status";

export interface TaskModel {
  id: string;
  title: string;
  description?: string;
  dueDate?: string | Date | null;
  status: TaskStatus;
  userId: string;
  subtasks?: SubtaskModel[];
  categories?: CategoryModel[];
  tags?: TagModel[];
}
