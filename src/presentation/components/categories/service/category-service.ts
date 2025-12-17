import { Injectable } from "@angular/core";
import { CreateCategoryUseCase } from "../../../../domain/usecases/category/create-category-usecase";
import { DeleteCategoryUseCase } from "../../../../domain/usecases/category/delete-category-usecase";
import { GetUserCategoriesUseCase } from "../../../../domain/usecases/category/get-user-categories-usecase";
import { UpdateCategoryUseCase } from "../../../../domain/usecases/category/update-category-usecase";
import { CategoryModel } from "../../../../domain/models/category/category-model";
import { GetCategoryUseCase } from "../../../../domain/usecases/category/get-category-usecase";
import { Observable } from "rxjs";

/**
 * Service for managing categories.
 * Provides methods to create, update, delete, and retrieve categories.
 * Integrates various use cases for category operations.
 * @see CreateCategoryUseCase
 * @see UpdateCategoryUseCase
 * @see DeleteCategoryUseCase
 * @see GetUserCategoriesUseCase
 * @see GetCategoryUseCase
 */
@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(
    private createUseCase: CreateCategoryUseCase,
    private updateUseCase: UpdateCategoryUseCase,
    private deleteUseCase: DeleteCategoryUseCase,
    private getCategoriesUseCase: GetUserCategoriesUseCase,
    private getUseCase: GetCategoryUseCase
  ) { }

  // Create a new category
  createCategory(model: CategoryModel): Observable<CategoryModel> {
    return this.createUseCase.execute(model);
  }

  // Update an existing category
  updateCategory(id: string, model: CategoryModel): Observable<CategoryModel> {
    return this.updateUseCase.execute(id, model);
  }

  // Delete a category by ID
  deleteCategory(categoryId: string): Observable<void> {
    return this.deleteUseCase.execute(categoryId);
  }

  // Get all categories for the current user
  getUserCategories(): Observable<CategoryModel[]> {
    return this.getCategoriesUseCase.execute();
  }

  // Get a specific category by ID
  getCategory(id: string): Observable<CategoryModel> {
    return this.getUseCase.execute(id);
  }
}
