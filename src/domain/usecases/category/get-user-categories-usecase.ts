import { inject, Injectable } from "@angular/core";
import { CategoryRepository } from "../../repositories/category-repository";
import { CategoryModel } from "../../models/category/category-model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class GetUserCategoriesUseCase {
  private categoryRepository = inject(CategoryRepository);

  execute(): Observable <CategoryModel[]> {
    return this.categoryRepository.getUserCategories();
  }
}
