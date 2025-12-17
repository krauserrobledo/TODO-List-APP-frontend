import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoadTasks, AddTask, UpdateTask, DeleteTask, LoadTask, AddCategoryToTask, DeleteCategoryFromTask, AddTagToTask, DeleteTagFromTask } from './task.actions';
import { TaskService } from '../../components/task/service/task-service';
import { TaskStateModel } from '../../../domain/models/task/task-state-model';
import { TaskModel } from '../../../domain/models/task/task-model';

/**
 * TaskState manages the state related to tasks in the application.
 * It handles actions for creating, updating, deleting, and loading tasks.
 * The state includes a list of tasks, the selected task,
 * loading status, and error information.
 * It uses TaskService to perform the necessary operations
 * and updates the state accordingly.
 */
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
  constructor(private taskService: TaskService) { }

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
  /* Loads all tasks for the user */
  @Action(LoadTasks)
  load(ctx: StateContext<TaskStateModel>) {
    ctx.patchState({ isLoading: true });

    return this.taskService.getUserTasks().pipe(
      tap(tasks => {
        const selected = ctx.getState().selectedTask;
        const stillExists = tasks.find(t => t.id === selected?.id) || null;

        ctx.patchState({
          tasks,
          selectedTask: stillExists,
          isLoading: false
        });
      }),
      catchError(err => {
        ctx.patchState({ error: err.message, isLoading: false });
        return throwError(() => err);
      })
    );
  }

  /* Adds a new task */
  @Action(AddTask)
  add(ctx: StateContext<TaskStateModel>, action: AddTask) {
    return this.taskService.createTask(action.payload).pipe(
      tap(task =>
        ctx.patchState({
          tasks: [...ctx.getState().tasks, task],
          error: null
        })
      )
    );
  }

  /* Updates an existing task */
  @Action(UpdateTask)
  update(ctx: StateContext<TaskStateModel>, action: UpdateTask) {
    return this.taskService.updateTask(action.id, action.payload).pipe(
      tap((updatedTask: TaskModel) => {
        const state = ctx.getState();

        ctx.patchState({
          tasks: state.tasks.map(t =>
            t.id === updatedTask.id ? updatedTask : t
          ),
          selectedTask:
            state.selectedTask?.id === updatedTask.id
              ? updatedTask
              : state.selectedTask
        });
      }),
      catchError(err => {
        ctx.patchState({ error: err.message || 'Unexpected error' });
        return throwError(() => err);
      })
    );
  }

  /* Deletes a task */
  @Action(DeleteTask)
  delete(ctx: StateContext<TaskStateModel>, action: DeleteTask) {
    return this.taskService.deleteTask(action.id).pipe(
      tap(() =>
        ctx.patchState({
          tasks: ctx.getState().tasks.filter(t => t.id !== action.id),
          selectedTask:
            ctx.getState().selectedTask?.id === action.id
              ? null
              : ctx.getState().selectedTask
        })
      )
    );
  }

  /* Loads a specific task */
  @Action(LoadTask)
  getTask(ctx: StateContext<TaskStateModel>, action: LoadTask) {
    return this.taskService.getTask(action.id).pipe(
      tap(task => ctx.patchState({ selectedTask: task }))
    );
  }

  /* Adds a category to a task */
  @Action(AddCategoryToTask)
  addCategory(ctx: StateContext<TaskStateModel>, action: AddCategoryToTask) {
    return this.taskService.addCategory(action.taskId, action.categoryId).pipe(
      tap(updated =>
        ctx.patchState({
          tasks: ctx.getState().tasks.map(t =>
            t.id === action.taskId ? updated : t
          ),
          selectedTask:
            ctx.getState().selectedTask?.id === action.taskId
              ? updated
              : ctx.getState().selectedTask
        })
      )
    );
  }

  /* Deletes a category from a task */
  @Action(DeleteCategoryFromTask)
  deleteCategory(ctx: StateContext<TaskStateModel>, action: DeleteCategoryFromTask) {
    return this.taskService.deleteCategory(action.taskId, action.categoryId).pipe(
      tap(updated =>
        ctx.patchState({
          tasks: ctx.getState().tasks.map(t =>
            t.id === action.taskId ? updated : t
          ),
          selectedTask:
            ctx.getState().selectedTask?.id === action.taskId
              ? updated
              : ctx.getState().selectedTask
        })
      )
    );
  }

  /* Adds a tag to a task */
  @Action(AddTagToTask)
  addTag(ctx: StateContext<TaskStateModel>, action: AddTagToTask) {
    return this.taskService.addTag(action.taskId, action.tagId).pipe(
      tap(updated =>
        ctx.patchState({
          tasks: ctx.getState().tasks.map(t =>
            t.id === action.taskId ? updated : t
          ),
          selectedTask:
            ctx.getState().selectedTask?.id === action.taskId
              ? updated
              : ctx.getState().selectedTask
        })
      )
    );
  }

  /* Deletes a tag from a task */
  @Action(DeleteTagFromTask)
  deleteTag(ctx: StateContext<TaskStateModel>, action: DeleteTagFromTask) {
    return this.taskService.deleteTag(action.taskId, action.tagId).pipe(
      tap(updated =>
        ctx.patchState({
          tasks: ctx.getState().tasks.map(t =>
            t.id === action.taskId ? updated : t
          ),
          selectedTask:
            ctx.getState().selectedTask?.id === action.taskId
              ? updated
              : ctx.getState().selectedTask
        })
      )
    );
  }
}
