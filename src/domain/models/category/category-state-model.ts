import { CategoryModel } from "./category-model";

export interface CategoryStateModel {
    categories: CategoryModel[];
    selectedCategory: CategoryModel | null;
    isLoading: boolean;
    error: string | null;
  }