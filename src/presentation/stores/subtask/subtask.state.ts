import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { SubtaskAction } from './subtask.actions';

export interface SubtaskStateModel {
  items: string[];
}

@State<SubtaskStateModel>({
  name: 'subtask',
  defaults: {
    items: []
  }
})
@Injectable()
export class SubtaskState {

  @Selector()
  static getState(state: SubtaskStateModel) {
    return state;
  }

  @Action(SubtaskAction)
  add(ctx: StateContext<SubtaskStateModel>, { payload }: SubtaskAction) {
    const stateModel = ctx.getState();
    stateModel.items = [...stateModel.items, payload];
    ctx.setState(stateModel);
  }
}
