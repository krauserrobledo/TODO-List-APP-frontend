import { TagModel } from "../models/tag/tag-model";

export abstract class TagRepository {
  abstract createTag(tag: TagModel): Promise<TagModel>;
  abstract updateTag(id: string, tag: TagModel): Promise<TagModel>;
  abstract deleteTag(id: string): Promise<void>;
  abstract getUserTags(): Promise<TagModel[]>;
  abstract getTag(id: string): Promise<TagModel>;
}