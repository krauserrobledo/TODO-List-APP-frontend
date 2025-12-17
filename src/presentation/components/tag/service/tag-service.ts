import { Injectable } from "@angular/core";
import { TagModel } from "../../../../domain/models/tag/tag-model";
import { CreateTagUseCase } from "../../../../domain/usecases/tag/create-tag-usecase";
import { DeleteTagUseCase } from "../../../../domain/usecases/tag/delete-tag-usecase";
import { GetTagUseCase } from "../../../../domain/usecases/tag/get-tag-usecase";
import { UpdateTagUseCase } from "../../../../domain/usecases/tag/update-tag-usecase";
import { GetUserTagsUseCase } from "../../../../domain/usecases/tag/get-user-tags-usecase";
import { Observable } from "rxjs";

/**
 * Service for managing tags.
 * Provides methods to create, update, delete, and retrieve tags.
 * Integrates various use cases for tag operations.
 * @see CreateTagUseCase
 * @see UpdateTagUseCase
 * @see DeleteTagUseCase
 * @see GetTagUseCase
 * @see GetUserTagsUseCase
 */
@Injectable({ providedIn: 'root' })
export class TagService {
  constructor(
    private createUseCase: CreateTagUseCase,
    private updateUseCase: UpdateTagUseCase,
    private deleteUseCase: DeleteTagUseCase,
    private getTagUseCase: GetTagUseCase,
    private getUserTagsUseCase: GetUserTagsUseCase
  ) { }

  // Create a new tag
  createTag(model: TagModel): Observable<TagModel> {
    return this.createUseCase.execute(model);
  }

  // Update an existing tag
  updateTag(id: string, model: TagModel): Observable<TagModel> {
    return this.updateUseCase.execute(id, model);
  }

  // Delete a tag by ID
  deleteTag(tagId: string): Observable<void> {
    return this.deleteUseCase.execute(tagId);
  }

  // Get a specific tag by ID
  getTag(id: string): Observable<TagModel> {
    return this.getTagUseCase.execute(id);
  }

  // Get all tags for the current user
  getUserTags(): Observable<TagModel[]> {
    return this.getUserTagsUseCase.execute();
  }
}
