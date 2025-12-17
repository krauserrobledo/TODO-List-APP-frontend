import { inject, Injectable } from "@angular/core";
import { CategoryRepository } from "../../i-repositories/category-repository";
import { CategoryModel } from "../../models/category/category-model";
import { Observable } from "rxjs";

/**
 * Use case for retrieving all categories of the current user.
 */
@Injectable({ providedIn: 'root' })
export class GetUserCategoriesUseCase {
  private categoryRepository = inject(CategoryRepository);

  execute(): Observable<CategoryModel[]> {
    return this.categoryRepository.getUserCategories();
  }
}
