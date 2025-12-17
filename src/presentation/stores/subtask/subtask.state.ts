import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { SubtaskStateModel } from '../../../domain/models/subtask/subtask-state-model';
import { SubtaskService } from '../../components/subtask/service/subtask-service';
import { AddSubtask, DeleteSubtask, LoadSubtask, LoadSubtasks, UpdateSubtask } from './subtask.actions';
import { catchError, tap, throwError } from 'rxjs';

/**
 * SubtaskState manages the state related to subtasks in the application.
 * It handles actions for creating, updating, deleting, and loading subtasks.
 * The state includes a list of subtasks, the selected subtask,
 * loading status, and error information.
 * It uses SubtaskService to perform the necessary operations
 * and updates the state accordingly.
 */
@State<SubtaskStateModel>({
  name: 'subtasks',
  defaults: {
    subtasks: [],
    selectedSubtask: null,
    isLoading: false,
    error: null
  }
})

@Injectable()
export class SubtaskState {
  constructor(private subtaskService: SubtaskService) { }

  // Selectors
  @Selector()
  static subtasks(state: SubtaskStateModel) {
    return state.subtasks;
  }

  @Selector()
  static selectedSubtask(state: SubtaskStateModel) {
    return state.selectedSubtask;
  }

  @Selector()
  static isLoading(state: SubtaskStateModel) {
    return state.isLoading;
  }

  @Selector()
  static error(state: SubtaskStateModel) {
    return state.error;
  }

  // Actions

  /* Loads all subtasks for a specific task */
  @Action(LoadSubtasks)
  getSubtasks(ctx: StateContext<SubtaskStateModel>, action: LoadSubtasks) {
    ctx.patchState({ isLoading: true });
    return this.subtaskService.getTaskSubtasks(action.taskId).pipe(
      tap(subtasks => ctx.patchState({ subtasks, isLoading: false })),
      catchError(err => {
        ctx.patchState({ error: err.message, isLoading: false });
        return throwError(() => err);
      })
    );
  }

  /* Adds a new subtask */
  @Action(AddSubtask)
  add(ctx: StateContext<SubtaskStateModel>, action: AddSubtask) {
    return this.subtaskService.createSubtask(action.payload).pipe(
      tap(subtask => ctx.patchState({ subtasks: [...ctx.getState().subtasks, subtask] }))
    );
  }

  /* Updates an existing subtask */
  @Action(UpdateSubtask)
  update(ctx: StateContext<SubtaskStateModel>, action: UpdateSubtask) {
    return this.subtaskService.updateSubtask(action.id, action.payload).pipe(
      tap(updated => ctx.patchState({
        subtasks: ctx.getState().subtasks.map(s => s.id === action.id ? updated : s)
      }))
    );
  }

  /* Deletes a subtask */
  @Action(DeleteSubtask)
  delete(ctx: StateContext<SubtaskStateModel>, action: DeleteSubtask) {
    return this.subtaskService.deleteSubtask(action.id).pipe(
      tap(() => ctx.patchState({
        subtasks: ctx.getState().subtasks.filter(t => t.id !== action.id)
      }))
    );
  }

  /* Loads a specific subtask */
  @Action(LoadSubtask)
  getSubtask(ctx: StateContext<SubtaskStateModel>, action: LoadSubtask) {
    return this.subtaskService.getSubtask(action.id).pipe(
      tap(subtask => ctx.patchState({ selectedSubtask: subtask }))
    );
  }
}
