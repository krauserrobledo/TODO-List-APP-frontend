import { inject, Injectable } from "@angular/core";
import { CategoryRepository } from "../../repositories/category-repository";
import { CategoryModel } from "../../models/category/category-model";

@Injectable({ providedIn: 'root' })
export class GetCategoryUseCase {
  private categoryRepository = inject(CategoryRepository);

  execute(model: CategoryModel): Promise <CategoryModel> {
    return this.categoryRepository.getCategory(model.id);
  }
}
