import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    FormsModule,
    ButtonModule,
    DialogModule,
    CardModule,
    InputTextModule,
    ColorPickerModule,
    ListboxModule
  ],
  templateUrl: './category-list.html',
  styleUrls: ['./category-list.css']
})
export class CategoryList {
  store = inject(CategoryStore);
  showCreateDialog = false;
  name = '';
  color = '#0078d7'; 

  ngOnInit() {
    this.store.loadCategories();
  }

  submit() {
    if (!this.name.trim()) return;

    const model: CategoryModel = {
      id: crypto.randomUUID(),
      name: this.name,
      color: this.color,
      userId: this.getUserId(),
    };

    this.store.createCategory(model);
    this.showCreateDialog = false;
    this.name = '';
    this.color = '#0078d7';
  }

  private getUserId(): string {
    return 'current-user-id';
  }

  openDialog() {
    this.showCreateDialog = true;
  }
}
