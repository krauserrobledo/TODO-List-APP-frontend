import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { CategoryAction } from './category.actions';

export interface CategoryStateModel {
  items: string[];
}

@State<CategoryStateModel>({
  name: 'category',
  defaults: {
    items: []
  }
})
@Injectable()
export class CategoryState {

  @Selector()
  static getState(state: CategoryStateModel) {
    return state;
  }

  @Action(CategoryAction)
  add(ctx: StateContext<CategoryStateModel>, { payload }: CategoryAction) {
    const stateModel = ctx.getState();
    stateModel.items = [...stateModel.items, payload];
    ctx.setState(stateModel);
  }
}
