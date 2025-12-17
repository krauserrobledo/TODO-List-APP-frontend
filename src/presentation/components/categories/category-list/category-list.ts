import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoryModel } from '../../../../domain/models/category/category-model';
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ListboxModule } from 'primeng/listbox';
import { Store } from '@ngxs/store';
import { CreateCategory, DeleteCategory, LoadCategories } from '../../../stores/category/category.actions';
import { CategoryState } from '../../../stores/category/category.state';
import { Observable } from 'rxjs';
import { Chip } from "primeng/chip";

/**
 * Component for displaying and managing the list of categories.
 * Allows creating, selecting, and deleting categories.
 * Uses a dialog for creating new categories.
 * Integrates with NGXS store for state management.
 */
@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    CardModule,
    InputTextModule,
    ColorPickerModule,
    ListboxModule,
    ReactiveFormsModule,
    Chip
  ],
  templateUrl: './category-list.html',
  styleUrls: ['./category-list.css']
})

export class CategoryList {
  store = inject(Store);
  categories$: Observable<CategoryModel[]> = this.store.select(CategoryState.categories);

  selectedCategory: CategoryModel | null = null;
  categoryToEdit: CategoryModel | null = null;
  showCreateDialog = false;
  categoryForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  // Initialize the component and load categories
  ngOnInit() {
    this.store.dispatch(new LoadCategories());

    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      color: ['#0078d7'],
    });
  }

  // Submit the form to create a new category
  submit() {
    if (this.categoryForm.invalid) return;

    const formValue = this.categoryForm.value;

    const model: CategoryModel = {
      id: crypto.randomUUID(),
      name: formValue.name,
      color: formValue.color,
      userId: this.getUserId(),
    };

    this.store.dispatch(new CreateCategory(model));
    this.showCreateDialog = false;
    this.categoryForm.reset({ name: '', color: '#0078d7' });
  }

  // Delete a category
  deleteCategory(category: CategoryModel) {
    this.store.dispatch(new DeleteCategory(category.id));
    if (this.selectedCategory?.id === category.id) this.selectedCategory = null;
  }

  // Get the current user's ID (stub implementation)
  private getUserId(): string {
    return 'current-user-id';
  }

  // Open the dialog to create a new category
  openDialog() {
    this.showCreateDialog = true;
    this.categoryForm.reset({ name: '', color: '#0078d7' });
  }
}

