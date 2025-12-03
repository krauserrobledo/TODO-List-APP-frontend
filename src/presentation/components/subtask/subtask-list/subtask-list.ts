import { CommonModule } from '@angular/common';
import { Component, OnChanges, Input, inject } from '@angular/core';
import { SubtaskModel } from '../../../../domain/models/subtask/subtask-model';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Dialog } from "primeng/dialog";
import { Button } from "primeng/button";
import { InputTextModule } from 'primeng/inputtext';
import { Store } from '@ngxs/store';
import { AddSubtask, DeleteSubtask, LoadSubtasks } from '../../../stores/subtask/subtask.actions';
import { Observable } from 'rxjs';
import { SubtaskState } from '../../../stores/subtask/subtask.state';

@Component({
  selector: 'app-subtask-list',
  standalone: true,
  imports: [CommonModule, FormsModule, Dialog, Button, InputTextModule, ReactiveFormsModule],
  templateUrl: './subtask-list.html',
  styleUrls: ['./subtask-list.css']
})

export class SubtaskList implements OnChanges {
  @Input() taskId: string | null = null;
  store = inject(Store);
  subtasks$: Observable<SubtaskModel[]> = this.store.select(SubtaskState.subtasks);
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
      this.store.dispatch(new LoadSubtasks(this.taskId));
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

    this.store.dispatch(new AddSubtask(model));
    this.showCreateDialog = false;
  }

  deleteSubtask(id: string) {
    this.store.dispatch(new DeleteSubtask(id));
  }
}
