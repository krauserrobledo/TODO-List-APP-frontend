import { TagModel } from "../../../domain/models/tag/tag-model";

export class CreateTag {
  static readonly type = '[Tag] Create';
  constructor(public payload: TagModel) {}
}

export class UpdateTag {
  static readonly type = '[Tag] Update';
  constructor(public id: string, public payload: TagModel) {}
}

export class DeleteTag {
  static readonly type = '[Tag] Delete';
  constructor(public id: string) {}
}

export class LoadTag {
  static readonly type = '[Tag] Load One';
  constructor(public id: string) {}
}

export class LoadTags {
  static readonly type = '[Tag] Load User Tags';
}
