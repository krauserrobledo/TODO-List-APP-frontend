import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagStore } from '../../../stores/tag-store';
import { TagModel } from '../../../../domain/models/tag/tag-model';
import { Button } from "primeng/button";
import { Dialog } from "primeng/dialog";
import { FormsModule } from '@angular/forms';
import { Card } from "primeng/card";
import { InputText } from "primeng/inputtext";

@Component({
  selector: 'app-tag-list',
  standalone: true,
  imports: [CommonModule, FormsModule, Button, Dialog, Card, InputText],
  templateUrl: './tag-list.html',
  styleUrls: ['./tag-list.css'] 
})
export class TagList {
  name = '';
  store = inject(TagStore);
  showCreateDialog= false;

  ngOnInit() {
    this.store.loadTags();
  }

  submit() {
    if (!this.name.trim()) return;

    const model: TagModel = {
      id: crypto.randomUUID(),
      name: this.name,
      userId: this.getUserId()
    };

    this.store.createTag(model);
    this.name = '';
  }

  // not using ATM
  private getUserId(): string {
    return 'current-user-id';
  }

  openDialog() {
    this.showCreateDialog = true;
  }
}
