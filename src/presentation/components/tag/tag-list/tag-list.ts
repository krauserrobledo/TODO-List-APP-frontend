import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagStore } from '../../../stores/tag';
import { TagModel } from '../../../../domain/models/tag/tag-model';
import { Button } from "primeng/button";
import { Dialog } from "primeng/dialog";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Card } from "primeng/card";
import { InputText } from "primeng/inputtext";

@Component({
  selector: 'app-tag-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Button, Dialog, Card, InputText],
  templateUrl: './tag-list.html',
  styleUrls: ['./tag-list.css'] 
})
export class TagList {
  store = inject(TagStore);
  showCreateDialog= false;
  tagForm!: FormGroup;
categoryForm: any;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.store.loadTags();

    this.tagForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  submit() {
    if (this.tagForm.invalid) return;

    const formValue = this.tagForm.value;

    const model: TagModel = {
      id: crypto.randomUUID(),
      name: formValue.name,
      userId: this.getUserId()
    };

    this.store.createTag(model);
    this.showCreateDialog = false;
  }

  private getUserId(): string {
    return 'current-user-id';
  }

  openDialog() {
    this.showCreateDialog = true;
  }
}
