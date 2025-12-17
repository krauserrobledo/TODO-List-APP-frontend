import { Observable } from "rxjs";
import { CategoryModel } from "../models/category/category-model";

/**
 * Abstract repository interface for managing categories.
 */
export abstract class CategoryRepository {
  abstract createCategory(category: CategoryModel): Observable<CategoryModel>;
  abstract updateCategory(id: string, category: CategoryModel): Observable<CategoryModel>;
  abstract deleteCategory(id: string): Observable<void>;
  abstract getUserCategories(): Observable<CategoryModel[]>;
  abstract getCategory(id: string): Observable<CategoryModel>;
}
