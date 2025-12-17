import { CategoryModel } from "./category-model";

/**
 * Model representing the state of categories.
 */
export interface CategoryStateModel {
    categories: CategoryModel[];
    selectedCategory: CategoryModel | null;
    isLoading: boolean;
    error: string | null;
  }
