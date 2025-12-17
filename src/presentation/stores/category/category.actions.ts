import { CategoryModel } from "../../../domain/models/category/category-model";

/** Action to create a new category */
export class CreateCategory {
  static readonly type = '[Category] Create';
  constructor(public payload: CategoryModel) { }
}

/** Action to update an existing category */
export class UpdateCategory {
  static readonly type = '[Category] Update';
  constructor(public id: string, public payload: CategoryModel) { }
}

/** Action to delete a category */
export class DeleteCategory {
  static readonly type = '[Category] Delete';
  constructor(public id: string) { }
}

/** Action to load a specific category */
export class LoadCategory {
  static readonly type = '[Category] Load One';
  constructor(public id: string) { }
}

/** Action to load all categories */
export class LoadCategories {
  static readonly type = '[Category] Load All';
}
