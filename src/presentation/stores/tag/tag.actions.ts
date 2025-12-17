import { TagModel } from "../../../domain/models/tag/tag-model";

/** Action to add a new tag */
export class AddTag {
  static readonly type = '[Tag] Create';
  constructor(public payload: TagModel) { }
}

/** Action to update an existing tag */
export class UpdateTag {
  static readonly type = '[Tag] Update';
  constructor(public id: string, public payload: TagModel) { }
}

/** Action to delete a tag */
export class DeleteTag {
  static readonly type = '[Tag] Delete';
  constructor(public id: string) { }
}

/** Action to load a specific tag */
export class LoadTag {
  static readonly type = '[Tag] Load One';
  constructor(public id: string) { }
}

/** Action to load all tags for the user */
export class LoadTags {
  static readonly type = '[Tag] Load User Tags';
}
