import { CategoryResponseDto } from "../categories/category-response-dto";
import { SubtaskResponseDto } from "../subtask/subtask-response-dto";
import { TagResponseDto } from "../tag/tag-response-dto";

export interface TaskResponseDto {
  
      id: string;
      title: string;
      description: string;
      dueDate: string;
      status: string;
      userId: string;
      subtasks: SubtaskResponseDto[];
      categories: CategoryResponseDto[];
      tags: TagResponseDto[];
    }
  