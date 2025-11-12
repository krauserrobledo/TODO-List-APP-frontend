import { CategoryModel } from "../category/category-model";
import { SubtaskEntity } from "./subtask-entity";
import { TagEntity } from "./tag-entity";

export interface TaskEntity {
  
      id: string;
      title: string;
      description: string;
      dueDate: string;
      status: string;
      userId: string;
      subtasks: SubtaskEntity[];
      categories: CategoryModel[];
      tags: TagEntity[];
    }