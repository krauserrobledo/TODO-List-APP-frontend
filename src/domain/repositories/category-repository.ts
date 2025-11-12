import { CategoryModel } from "../models/category/category-model";

export abstract class CategoryRepository {
  abstract createCategory(category: CategoryModel): Promise<CategoryModel>;
  abstract updateCategory(id: string, category: CategoryModel): Promise<CategoryModel>;
  abstract deleteCategory(id: string): Promise<void>;
  abstract getUserCategories(): Promise<CategoryModel[]>;
}