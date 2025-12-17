import { inject, Injectable } from "@angular/core";
import { CategoryRepository } from "../../i-repositories/category-repository";
import { CategoryModel } from "../../models/category/category-model";
import { Observable } from "rxjs";

/**
 * Use case for creating a new category.
 */
@Injectable({ providedIn: 'root' })
export class CreateCategoryUseCase {
  private categoryRepository = inject(CategoryRepository);

  execute(model: CategoryModel): Observable <CategoryModel> {
    return this.categoryRepository.createCategory(model);
  }
}
