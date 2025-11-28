import { CategoryModel } from "../../../domain/models/category/category-model";

export class CreateCategory {
  static readonly type = '[Category] Create';
  constructor(public payload: CategoryModel) {}
}

export class UpdateCategory {
  static readonly type = '[Category] Update';
  constructor(public id: string, public payload: CategoryModel) {}
}

export class DeleteCategory {
  static readonly type = '[Category] Delete';
  constructor(public id: string) {}
}

export class LoadCategory {
  static readonly type = '[Category] Load One';
  constructor(public id: string) {}
}

export class LoadCategories {
  static readonly type = '[Category] Load All';
}
