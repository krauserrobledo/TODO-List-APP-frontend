import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { CategoryStateModel } from '../../../domain/models/category/category-state-model';
import { CategoryService } from '../../components/categories/service/category-service';
import { CreateCategory, DeleteCategory, LoadCategories, LoadCategory, UpdateCategory } from './category.actions';
import { catchError, tap, throwError } from 'rxjs';

/**
 * CategoryState manages the state related to categories in the application.
 * It handles actions for creating, updating, deleting, and loading categories.
 * The state includes a list of categories, the selected category,
 * loading status, and error information.
 * It uses CategoryService to perform the necessary operations
 * and updates the state accordingly.
 */
@State<CategoryStateModel>({
  name: 'categories',
  defaults: {
    categories: [],
    selectedCategory: null,
    isLoading: false,
    error: null
  }
})

@Injectable()
export class CategoryState {
  constructor(private categoryService: CategoryService) { }

  // Selectors

  @Selector()
  static categories(state: CategoryStateModel) {
    return state.categories;
  }

  @Selector()
  static selectedCategory(state: CategoryStateModel) {
    return state.selectedCategory;
  }

  @Selector()
  static isLoading(state: CategoryStateModel) {
    return state.isLoading;
  }

  @Selector()
  static error(state: CategoryStateModel) {
    return state.error;
  }

  // Actions
  /* Creates a new category */
  @Action(CreateCategory)
  add(ctx: StateContext<CategoryStateModel>, action: CreateCategory) {
    return this.categoryService.createCategory(action.payload).pipe(
      tap(category => ctx.patchState({ categories: [...ctx.getState().categories, category] }))
    );
  }

  /* Updates an existing category */
  @Action(UpdateCategory)
  update(ctx: StateContext<CategoryStateModel>, action: UpdateCategory) {
    return this.categoryService.updateCategory(action.id, action.payload).pipe(
      tap(updated => ctx.patchState({
        categories: ctx.getState().categories.map(c => c.id === action.id ? updated : c)
      }))
    );
  }

  /* Deletes a category */
  @Action(DeleteCategory)
  delete(ctx: StateContext<CategoryStateModel>, action: DeleteCategory) {
    return this.categoryService.deleteCategory(action.id).pipe(
      tap(() => ctx.patchState({
        categories: ctx.getState().categories.filter(c => c.id !== action.id)
      }))
    );
  }

  /* Loads a specific category */
  @Action(LoadCategory)
  getTag(ctx: StateContext<CategoryStateModel>, action: LoadCategory) {
    return this.categoryService.getCategory(action.id).pipe(
      tap(category => ctx.patchState({ selectedCategory: category }))
    );
  }

  /* Loads all categories */
  @Action(LoadCategories)
  getTasks(ctx: StateContext<CategoryStateModel>) {
    ctx.patchState({ isLoading: true });
    return this.categoryService.getUserCategories().pipe(
      tap(categories => ctx.patchState({ categories, isLoading: false })),
      catchError(err => {
        ctx.patchState({ error: err.message, isLoading: false });
        return throwError(() => err);
      })
    );
  }
}
