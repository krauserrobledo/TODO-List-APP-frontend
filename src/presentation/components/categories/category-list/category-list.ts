import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryStore } from '../../../stores/category-store';
import { CategoryForm } from '../category-form/category-form';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, CategoryForm],
  templateUrl: './category-list.html',
  styleUrls: ['./category-list.css']
})
export class CategoryList {
  store = inject(CategoryStore);

  ngOnInit() {
    this.store.loadCategories();
  }
}
