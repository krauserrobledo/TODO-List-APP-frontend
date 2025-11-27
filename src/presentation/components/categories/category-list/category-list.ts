import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoryStore } from '../../../stores/category-store';
import { CategoryModel } from '../../../../domain/models/category/category-model';
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ListboxModule } from 'primeng/listbox';

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
    ReactiveFormsModule
  ],
  templateUrl: './category-list.html',
  styleUrls: ['./category-list.css']
})
export class CategoryList {
  store = inject(CategoryStore);
  showCreateDialog = false;
  categoryForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.store.loadCategories();

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

    this.store.createCategory(model);
    this.showCreateDialog = false;
    this.categoryForm.reset({ name: '', color: '#0078d7' }); 
  }

  private getUserId(): string {
    return 'current-user-id';
  }

  openDialog() {
    this.showCreateDialog = true;
    this.categoryForm.reset({ name: '', color: '#0078d7' });
  }
}
