import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { TagAction } from './tag.actions';

export interface TagStateModel {
  items: string[];
}

@State<TagStateModel>({
  name: 'tag',
  defaults: {
    items: []
  }
})
@Injectable()
export class TagState {

  @Selector()
  static getState(state: TagStateModel) {
    return state;
  }

  @Action(TagAction)
  add(ctx: StateContext<TagStateModel>, { payload }: TagAction) {
    const stateModel = ctx.getState();
    stateModel.items = [...stateModel.items, payload];
    ctx.setState(stateModel);
  }
}
