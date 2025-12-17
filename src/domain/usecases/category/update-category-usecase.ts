import { Injectable, inject } from '@angular/core';
import { CategoryRepository } from '../../i-repositories/category-repository';
import { CategoryModel } from '../../models/category/category-model';
import { Observable } from 'rxjs';

/**
 * Use case for updating an existing category.
 */
@Injectable({ providedIn: 'root' })
export class UpdateCategoryUseCase {
  private categoryRepository = inject(CategoryRepository);

  execute(id: string, model: CategoryModel): Observable<CategoryModel> {
    return this.categoryRepository.updateCategory(model.id, model);
  }
}
