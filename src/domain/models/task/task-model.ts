import { CategoryModel } from "../category/category-model";
import { SubtaskModel } from "../subtask/subtask-model";
import { TagModel } from "../tag/tag-model";

export interface TaskModel{
  
      id: string;
      title: string;
      description: string;
      dueDate: string;
      status: string;
      userId: string;
      subtasks: SubtaskModel[];
      categories: CategoryModel[];
      tags: TagModel[];
    }