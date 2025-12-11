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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.store.dispatch(new LoadCategories());

    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      color: ['#0078d7'],
    });
  }

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

  deleteCategory(category: CategoryModel) {
    this.store.dispatch(new DeleteCategory(category.id));
    if (this.selectedCategory?.id === category.id) this.selectedCategory = null;
  }

  private getUserId(): string {
    return 'current-user-id';
  }

  openDialog() {
    this.showCreateDialog = true;
    this.categoryForm.reset({ name: '', color: '#0078d7' });
  }
}

