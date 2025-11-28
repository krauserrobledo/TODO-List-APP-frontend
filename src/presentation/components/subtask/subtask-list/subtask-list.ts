import { CommonModule } from '@angular/common';
import { Component, OnChanges, Input, inject } from '@angular/core';
import { SubtaskStore } from '../../../stores/subtask/subtask-store';
import { SubtaskModel } from '../../../../domain/models/subtask/subtask-model';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Dialog } from "primeng/dialog";
import { Button } from "primeng/button";
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-subtask-list',
  standalone: true,
  imports: [CommonModule, FormsModule, Dialog, Button, InputTextModule, ReactiveFormsModule],
  templateUrl: './subtask-list.html',
  styleUrls: ['./subtask-list.css']
})

export class SubtaskList implements OnChanges {
  @Input() taskId: string | null = null;
  store = inject(SubtaskStore);

  showCreateDialog = false;
  subtaskForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.subtaskForm = this.fb.group({
      title: ['', Validators.required]
    });
  }

  ngOnChanges() {
    if (this.taskId) {
      this.store.loadSubtasks(this.taskId);
    }
  }

  openDialog() {
    this.showCreateDialog = true;
    this.subtaskForm.reset(); 
  }

  submit() {
    if (this.subtaskForm.invalid || !this.taskId) {
      this.subtaskForm.markAllAsTouched();
      return;
    }

    const model: SubtaskModel = {
      id: crypto.randomUUID(),
      title: this.subtaskForm.value.title,
      taskId: this.taskId
    };

    this.store.createSubtask(model);
    this.showCreateDialog = false;
  }

  deleteSubtask(id: string) {
    this.store.deleteSubtask(id);
  }
}
