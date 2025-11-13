import { Injectable, inject } from '@angular/core';
import { CategoryRepository } from '../../repositories/category-repository';
import { CategoryModel } from '../../models/category/category-model';

@Injectable({ providedIn: 'root' })
export class UpdateCategoryUseCase {
  private categoryRepository = inject(CategoryRepository);

  execute(model: CategoryModel): void {
    this.categoryRepository.updateCategory(model.id, model);
  }
}
