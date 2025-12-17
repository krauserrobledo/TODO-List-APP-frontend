import { TaskModel } from "../../../domain/models/task/task-model";

/** Action to load all tasks for the user */
export class LoadTasks {
  static readonly type = '[Task] Load';
}

/** Action to add a new task */
export class AddTask {
  static readonly type = '[Task] Add';
  constructor(public payload: TaskModel) { }
}

/** Action to update an existing task */
export class UpdateTask {
  static readonly type = '[Task] Update';
  constructor(public id: string, public payload: TaskModel) { }
}

/** Action to delete a task */
export class DeleteTask {
  static readonly type = '[Task] Delete';
  constructor(public id: string) { }
}

/** Action to load a specific task */
export class LoadTask {
  static readonly type = '[Task] Get';
  constructor(public id: string) { }
}

/** Action to add a category to a task */
export class AddCategoryToTask {
  static readonly type = '[Task] Add Category';
  constructor(public taskId: string, public categoryId: string) { }
}

/** Action to delete a category from a task */
export class DeleteCategoryFromTask {
  static readonly type = '[Task] Delete Category';
  constructor(public taskId: string, public categoryId: string) { }
}

/** Action to add a tag to a task */
export class AddTagToTask {
  static readonly type = '[Task] Add Tag';
  constructor(public taskId: string, public tagId: string) { }
}

/** Action to delete a tag from a task */
export class DeleteTagFromTask {
  static readonly type = '[Task] Delete Tag';
  constructor(public taskId: string, public tagId: string) { }
}
