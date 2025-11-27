import { Injectable, inject } from '@angular/core';
import { CategoryRepository } from '../../repositories/category-repository';
import { CategoryModel } from '../../models/category/category-model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UpdateCategoryUseCase {
  private categoryRepository = inject(CategoryRepository);

  execute(id: string, model: CategoryModel): Observable<CategoryModel> {
    return this.categoryRepository.updateCategory(model.id, model);
  }
}
