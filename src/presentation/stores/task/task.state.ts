import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {
  LoadTasks, AddTask, UpdateTask, DeleteTask, LoadTask, AddCategoryToTask, DeleteCategoryFromTask, AddTagToTask, DeleteTagFromTask
} from './task.actions';
import { TaskService } from '../../components/task/service/task-service';
import { TaskStateModel } from '../../../domain/models/task/task-state-model';

@State<TaskStateModel>({
  name: 'tasks',
  defaults: {
    tasks: [],
    selectedTask: null,
    isLoading: false,
    error: null
  }
})
@Injectable()
export class TaskState {
  constructor(private taskService: TaskService) {}

  // Selectors
  @Selector()
  static tasks(state: TaskStateModel) {
    return state.tasks;
  }

  @Selector()
  static selectedTask(state: TaskStateModel) {
    return state.selectedTask;
  }

  @Selector()
  static isLoading(state: TaskStateModel) {
    return state.isLoading;
  }

  @Selector()
  static error(state: TaskStateModel) {
    return state.error;
  }

  // Actions
  @Action(LoadTasks)
  load(ctx: StateContext<TaskStateModel>, action: LoadTasks) {
    ctx.patchState({ isLoading: true });
    return this.taskService.getUserTasks().pipe(
      tap(tasks => ctx.patchState({ tasks, isLoading: false })),
      catchError(err => {
        ctx.patchState({ error: err.message, isLoading: false });
        return throwError(() => err);
      })
    );
  }

  @Action(AddTask)
  add(ctx: StateContext<TaskStateModel>, action: AddTask) {
    return this.taskService.createTask(action.payload).pipe(
      tap(task => ctx.patchState({ tasks: [...ctx.getState().tasks, task] }))
    );
  }

  @Action(UpdateTask)
  update(ctx: StateContext<TaskStateModel>, action: UpdateTask) {
    return this.taskService.updateTask(action.id, action.payload).pipe(
      tap(updated => ctx.patchState({
        tasks: ctx.getState().tasks.map(t => t.id === action.id ? updated : t)
      }))
    );
  }

  @Action(DeleteTask)
  delete(ctx: StateContext<TaskStateModel>, action: DeleteTask) {
    return this.taskService.deleteTask(action.id).pipe(
      tap(() => ctx.patchState({
        tasks: ctx.getState().tasks.filter(t => t.id !== action.id)
      }))
    );
  }

  @Action(LoadTask)
  getTask(ctx: StateContext<TaskStateModel>, action: LoadTask) {
    return this.taskService.getTask(action.id).pipe(
      tap(task => ctx.patchState({ selectedTask: task }))
    );
  }

  @Action(AddCategoryToTask)
  addCategory(ctx: StateContext<TaskStateModel>, action: AddCategoryToTask) {
    return this.taskService.addCategory(action.taskId, action.categoryId).pipe(
      tap(updated => ctx.patchState({
        tasks: ctx.getState().tasks.map(t => t.id === action.taskId ? updated : t),
        selectedTask: updated
      }))
    );
  }

  @Action(DeleteCategoryFromTask)
  deleteCategory(ctx: StateContext<TaskStateModel>, action: DeleteCategoryFromTask) {
    return this.taskService.deleteCategory(action.taskId, action.categoryId).pipe(
      tap(updated => ctx.patchState({
        tasks: ctx.getState().tasks.map(t => t.id === action.taskId ? updated : t),
        selectedTask: updated
      }))
    );
  }

  @Action(AddTagToTask)
  addTag(ctx: StateContext<TaskStateModel>, action: AddTagToTask) {
    return this.taskService.addTag(action.taskId, action.tagId).pipe(
      tap(updated => ctx.patchState({
        tasks: ctx.getState().tasks.map(t => t.id === action.taskId ? updated : t),
        selectedTask: updated
      }))
    );
  }

  @Action(DeleteTagFromTask)
  deleteTag(ctx: StateContext<TaskStateModel>, action: DeleteTagFromTask) {
    return this.taskService.deleteTag(action.taskId, action.tagId).pipe(
      tap(updated => ctx.patchState({
        tasks: ctx.getState().tasks.map(t => t.id === action.taskId ? updated : t),
        selectedTask: updated
      }))
    );
  }
}
