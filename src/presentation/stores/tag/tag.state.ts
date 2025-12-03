import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { AddTag, DeleteTag, LoadTag, LoadTags, UpdateTag } from './tag.actions';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { TagService } from '../../components/tag/service/tag-service';
import { TagStateModel } from '../../../domain/models/tag/tag-state-model';

@State<TagStateModel>({
  name: 'tags',
  defaults: {
    tags: [],
    selectedTag: null,
    isLoading: false,
    error: null
  }
})
@Injectable()
export class TagState {
  constructor(private tagService: TagService) {}

  //Selectors
  @Selector()
  static tags(state: TagStateModel) {
    return state.tags;
  }

  @Selector()
  static selectedTag(state: TagStateModel) {
    return state.selectedTag;
  }

  @Selector()
  static isLoading(state: TagStateModel) {
    return state.isLoading;
  }

  @Selector()
  static error(state: TagStateModel) {
    return state.error;
  }
  
  //Actions
  @Action(AddTag)
  add(ctx: StateContext<TagStateModel>, action: AddTag) {
    return this.tagService.createTag(action.payload).pipe(
      tap(tag => ctx.patchState({ tags: [...ctx.getState().tags, tag] }))
    );
  }
  
  @Action(UpdateTag)
  update(ctx: StateContext<TagStateModel>, action: UpdateTag) {
    return this.tagService.updateTag(action.id, action.payload).pipe(
      tap(updated => ctx.patchState({
        tags: ctx.getState().tags.map(t => t.id === action.id ? updated : t)
      }))
    );
  }

  @Action(DeleteTag)
  delete(ctx: StateContext<TagStateModel>, action: DeleteTag) {
    return this.tagService.deleteTag(action.id).pipe(
      tap(() => ctx.patchState({
        tags: ctx.getState().tags.filter(t => t.id !== action.id)
      }))
    );
  }

  @Action(LoadTag)
  getTag(ctx: StateContext<TagStateModel>, action: LoadTag) {
    return this.tagService.getTag(action.id).pipe(
      tap(tag => ctx.patchState({ selectedTag: tag }))
    );
  }

  @Action(LoadTags)
  getTasks(ctx: StateContext<TagStateModel>) {
    ctx.patchState({ isLoading: true });
    return this.tagService.getUserTags().pipe(
      tap(tags => ctx.patchState({ tags, isLoading: false })),
      catchError(err => {
        ctx.patchState({ error: err.message, isLoading: false });
        return throwError(() => err);
      })
    );
  }
}
