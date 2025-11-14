import { CategoryResponseDto } from "../category/category-response-dto";
import { SubtaskResponseDto } from "../subtask/subtask-response-dto";
import { TagResponseDto } from "../tag/tag-response-dto";

export interface TaskResponseDto {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  status: TaskStatus;
  userId: string;
  subtasks?: SubtaskResponseDto[];
  categories?: CategoryResponseDto[];
  tags?: TagResponseDto[];
  
}

export type TaskStatus =
  | 'Non Started'
  | 'In Progress'
  | 'Paused'
  | 'Late'
  | 'Finished';
  