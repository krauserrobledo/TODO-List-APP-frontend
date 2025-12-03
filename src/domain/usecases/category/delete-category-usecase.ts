import { Injectable, inject } from '@angular/core';
import { CategoryRepository } from '../../i-repositories/category-repository';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class DeleteCategoryUseCase {
  private categoryRepository = inject(CategoryRepository);

  execute(id: string): Observable<void> {
    return this.categoryRepository.deleteCategory(id);
  }
}
