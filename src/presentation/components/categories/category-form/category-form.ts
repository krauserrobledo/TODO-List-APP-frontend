import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryModel } from '../../../../domain/models/category/category-model';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-form.html',
})
export class CategoryForm {
  name = '';
  color = '#0078d7'; // valor por defecto
  @Output() create = new EventEmitter<CategoryModel>();

  submit() {
    if (!this.name.trim()) return;

    const model: CategoryModel = {
      id: crypto.randomUUID(),
      name: this.name,
      color: this.color,
      userId: this.getUserId()
    };

    this.create.emit(model);
    this.name = '';
    this.color = '#0078d7';
  }

  private getUserId(): string {
    return 'current-user-id';
  }
}
