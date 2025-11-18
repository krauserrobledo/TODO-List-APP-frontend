import { Injectable } from "@angular/core";
import { CreateCategoryUseCase } from "../../../../domain/usecases/category/create-category-usecase";
import { DeleteCategoryUseCase } from "../../../../domain/usecases/category/delete-category-usecase";
import { GetUserCategoriesUseCase } from "../../../../domain/usecases/category/get-user-categories-usecase";
import { UpdateCategoryUseCase } from "../../../../domain/usecases/category/update-category-usecase";
import { CategoryModel } from "../../../../domain/models/category/category-model";
import { GetCategoryUseCase } from "../../../../domain/usecases/category/get-category-usecase";


@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(
    private createUseCase: CreateCategoryUseCase,
    private updateUseCase: UpdateCategoryUseCase,
    private deleteUseCase: DeleteCategoryUseCase,
    private getCategoriesUseCase: GetUserCategoriesUseCase,
    private getUseCase: GetCategoryUseCase
  ) {}

  createCategory(model: CategoryModel): Promise<CategoryModel> {
    return this.createUseCase.execute(model);
  }

  updateCategories(id: string, model: CategoryModel): Promise<CategoryModel> {
    return this.updateUseCase.execute(id, model);
  }

  deleteCategory( categoryId: string): void {
    this.deleteUseCase.execute(categoryId);
  }

  getUserCategories(id: string): Promise<CategoryModel[]> {
    return this.getCategoriesUseCase.execute();
  }

  getCategory(id: string): Promise<CategoryModel>{
    return this.getUseCase.execute(id);

  }
}
