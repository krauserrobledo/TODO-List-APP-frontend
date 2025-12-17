import { Observable } from "rxjs";
import { TagModel } from "../models/tag/tag-model";

/**
 * Abstract repository interface for managing tags.
 */
export abstract class TagRepository {

  abstract createTag(tag: TagModel): Observable<TagModel>;
  abstract updateTag(id: string, tag: TagModel): Observable<TagModel>;
  abstract deleteTag(id: string): Observable<void>;
  abstract getUserTags(): Observable<TagModel[]>;
  abstract getTag(id: string): Observable<TagModel>;
}
