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

/**
 * Component for displaying and managing the list of subtasks for a specific task.
 * Allows creating and deleting subtasks.
 * Uses a dialog for creating new subtasks.
 * Integrates with NGXS store for state management.
 * @see SubtaskModel
 * @see AddSubtask
 * @see DeleteSubtask
 * @see LoadSubtasks
 */
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

  constructor(private fb: FormBuilder) { }

  // Initialize the component and the subtask form
  ngOnInit() {
    this.subtaskForm = this.fb.group({
      title: ['', Validators.required]
    });
  }

  // Load subtasks when the taskId input changes
  ngOnChanges() {
    if (this.taskId) {
      this.store.dispatch(new LoadSubtasks(this.taskId));
    }
  }

  // Open the dialog to create a new subtask
  openDialog() {
    this.showCreateDialog = true;
    this.subtaskForm.reset();
  }

  // Submit the new subtask form
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

  // Delete a subtask by ID
  deleteSubtask(id: string) {
    this.store.dispatch(new DeleteSubtask(id));
  }
}
