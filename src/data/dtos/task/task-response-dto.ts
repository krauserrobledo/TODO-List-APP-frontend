import { TaskStatus } from "../../../domain/models/task/task-status";
import { CategoryResponseDto } from "../category/category-response-dto";
import { SubtaskResponseDto } from "../subtask/subtask-response-dto";
import { TagResponseDto } from "../tag/tag-response-dto";

/**
 * Data Transfer Object representing a task response.
 */
export interface TaskResponseDto {
  // Task properties
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  status: TaskStatus;
  userId: string;

  // Relations
  subtasks?: SubtaskResponseDto[];
  taskCategories?: { category: CategoryResponseDto }[];
  taskTags?: { tag: TagResponseDto }[];
  
  // Flattened relations
  categories?: CategoryResponseDto[];
  tags?: TagResponseDto[];
}


