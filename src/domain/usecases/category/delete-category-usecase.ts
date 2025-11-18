import { Injectable, inject } from '@angular/core';
import { CategoryRepository } from '../../repositories/category-repository';
import { CategoryModel } from '../../models/category/category-model';

@Injectable({ providedIn: 'root' })
export class DeleteCategoryUseCase {
  private categoryRepository = inject(CategoryRepository);

  execute(id: string): void {
    this.categoryRepository.deleteCategory(id);
  }
}
