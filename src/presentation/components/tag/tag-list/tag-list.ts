import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModel } from '../../../../domain/models/tag/tag-model';
import { Button } from "primeng/button";
import { Dialog } from "primeng/dialog";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputText } from "primeng/inputtext";
import { Store } from '@ngxs/store';
import { AddTag, DeleteTag, LoadTags } from '../../../stores/tag/tag.actions';
import { TagState } from '../../../stores/tag/tag.state';
import { Observable } from 'rxjs';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-tag-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Button, Dialog, InputText, ChipModule],
  templateUrl: './tag-list.html',
  styleUrls: ['./tag-list.css'] 
})
export class TagList {
  store = inject(Store);
  tags$: Observable<TagModel[]> = this.store.select(TagState.tags);
  showCreateDialog= false;
  tagForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.store.dispatch( new LoadTags());

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

    this.store.dispatch(new AddTag(model));
    this.showCreateDialog = false;
  }

  deleteTag(id : string){
    this.store.dispatch( new DeleteTag(id))
  }

  private getUserId(): string {
    return 'current-user-id';
  }

  openDialog() {
    this.showCreateDialog = true;
  }
}
