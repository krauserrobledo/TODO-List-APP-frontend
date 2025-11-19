import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagForm } from '../tag-form/tag-form';
import { TagStore } from '../../../stores/tag-store';

@Component({
  selector: 'app-tag-list',
  standalone: true,
  imports: [CommonModule, TagForm],
  templateUrl: './tag-list.html',
  styleUrls: ['./tag-list.css'] 
})
export class TagList {
  store = inject(TagStore);

  ngOnInit() {
    this.store.loadTags();
  }
}
