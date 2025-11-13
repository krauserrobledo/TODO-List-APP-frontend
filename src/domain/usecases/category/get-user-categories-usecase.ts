import { inject, Injectable } from "@angular/core";
import { CategoryRepository } from "../../repositories/category-repository";
import { CategoryModel } from "../../models/category/category-model";

@Injectable({ providedIn: 'root' })
export class GetUserCategoriesUseCase {
  private categoryRepository = inject(CategoryRepository);

  execute(): Promise <CategoryModel[]> {
    return this.categoryRepository.getUserCategories();
  }
}
