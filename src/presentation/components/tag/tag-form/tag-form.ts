import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TagModel } from '../../../../domain/models/tag/tag-model';

@Component({
  selector: 'app-tag-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tag-form.html' 
})
export class TagForm {
  name = '';
  @Output() create = new EventEmitter<TagModel>();

  submit() {
    if (!this.name.trim()) return;

    const model: TagModel = {
      id: crypto.randomUUID(),
      name: this.name,
      userId: this.getUserId()
    };

    this.create.emit(model);
    this.name = '';
  }

  private getUserId(): string {
    return 'current-user-id';
  }
}
