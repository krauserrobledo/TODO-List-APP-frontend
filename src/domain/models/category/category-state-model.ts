import { CategoryModel } from "./category-model";

export interface CategoryStateModel {
    tasks: CategoryModel[];
    selectedTask: CategoryModel | null;
    isLoading: boolean;
    error: string | null;
  }