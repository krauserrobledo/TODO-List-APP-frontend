import { SubtaskModel } from "../../../domain/models/subtask/subtask-model";

/** Action to add a new subtask */
export class AddSubtask {
  static readonly type = '[Subtask] Create';
  constructor(public payload: SubtaskModel) {}
}

/** Action to update an existing subtask */
export class UpdateSubtask {
  static readonly type = '[Subtask] Update';
  constructor(public id: string, public payload: SubtaskModel) {}
}

/** Action to delete a subtask */
export class DeleteSubtask {
  static readonly type = '[Subtask] Delete';
  constructor(public id: string) {}
}

/** Action to load a specific subtask */
export class LoadSubtask {
  static readonly type = '[Subtask] Load One';
  constructor(public id: string) {}
}

/** Action to load all subtasks for a specific task */
export class LoadSubtasks {
  static readonly type = '[Subtask] Load All From Task';
  constructor(public taskId: string) {}
}
