import { inject, Injectable, signal } from '@angular/core';
import { CategoryService } from '../components/categories/service/category-service';
import { CategoryModel } from '../../domain/models/category/category-model';

@Injectable({ providedIn: 'root' })
export class CategoryStore {
  private categoryService = inject(CategoryService);

  categories = signal<CategoryModel[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  // CRUD
  async loadCategories() {
    this.isLoading.set(true);
    try {
      const result = await this.categoryService.getUserCategories();
      this.categories.set(result);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }

  async createCategory(model: CategoryModel) {
    try {
      const newCategory = await this.categoryService.createCategory(model);
      this.categories.update(categories => [...categories, newCategory]);
    } catch (err: any) {
      this.error.set(err.message);
    }
  }

  async updateCategories(id: string, model: CategoryModel) {
    try {
      const updatedCategories = await this.categoryService.updateCategories(id, model);
      this.categories.update(categories =>
        categories.map(c => (c.id === id ? updatedCategories : c))
      );
    } catch (err: any) {
      this.error.set(err.message);
    }
  }

  async deleteCategory(id: string) {
    try {
      await this.categoryService.deleteCategory(id);
      this.categories.update(categories => categories.filter(c => c.id !== id));
    } catch (err: any) {
      this.error.set(err.message);
    }
  }

}
