import { TaskModel } from "../../../domain/models/task/task-model";

export class LoadTasks {
  static readonly type = '[Task] Load';
}

export class AddTask {
  static readonly type = '[Task] Add';
  constructor(public payload: TaskModel) {}
}

export class UpdateTask {
  static readonly type = '[Task] Update';
  constructor(public id: string, public payload: TaskModel) {}
}

export class DeleteTask {
  static readonly type = '[Task] Delete';
  constructor(public id: string) {}
}

export class GetTask {
  static readonly type = '[Task] Get';
  constructor(public id: string) {}
}

export class AddCategoryToTask {
  static readonly type = '[Task] Add Category';
  constructor(public taskId: string, public categoryId: string) {}
}

export class DeleteCategoryFromTask {
  static readonly type = '[Task] Delete Category';
  constructor(public taskId: string, public categoryId: string) {}
}

export class AddTagToTask {
  static readonly type = '[Task] Add Tag';
  constructor(public taskId: string, public tagId: string) {}
}

export class DeleteTagFromTask {
  static readonly type = '[Task] Delete Tag';
  constructor(public taskId: string, public tagId: string) {}
}
