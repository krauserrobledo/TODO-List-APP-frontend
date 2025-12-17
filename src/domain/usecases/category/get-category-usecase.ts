import { inject, Injectable } from "@angular/core";
import { CategoryRepository } from "../../i-repositories/category-repository";
import { CategoryModel } from "../../models/category/category-model";
import { Observable } from "rxjs";

/**
 * Use case for retrieving a category by its ID.
 */
@Injectable({ providedIn: 'root' })
export class GetCategoryUseCase {
  private categoryRepository = inject(CategoryRepository);

  execute(id: string): Observable <CategoryModel> {
    return this.categoryRepository.getCategory(id);
  }
}
