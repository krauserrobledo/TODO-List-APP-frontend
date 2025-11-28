import { SubtaskModel } from "../../../domain/models/subtask/subtask-model";

export class CreateSubtask {
  static readonly type = '[Subtask] Create';
  constructor(public payload: SubtaskModel) {}
}

export class UpdateSubtask {
  static readonly type = '[Subtask] Update';
  constructor(public id: string, public payload: SubtaskModel) {}
}

export class DeleteSubtask {
  static readonly type = '[Subtask] Delete';
  constructor(public id: string) {}
}

export class LoadSubtask {
  static readonly type = '[Subtask] Load One';
  constructor(public id: string) {}
}

export class LoadTaskSubtasks {
  static readonly type = '[Subtask] Load All From Task';
  constructor(public taskId: string) {}
}
