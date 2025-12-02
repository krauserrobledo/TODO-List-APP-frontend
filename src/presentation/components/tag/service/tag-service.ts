import { Injectable } from "@angular/core";
import { TagModel } from "../../../../domain/models/tag/tag-model";
import { CreateTagUseCase } from "../../../../domain/usecases/tag/create-tag-usecase";
import { DeleteTagUseCase } from "../../../../domain/usecases/tag/delete-tag-usecase";
import { GetTagUseCase } from "../../../../domain/usecases/tag/get-tag-usecase";
import { UpdateTagUseCase } from "../../../../domain/usecases/tag/update-tag-usecase";
import { GetUserTagsUseCase } from "../../../../domain/usecases/tag/get-user-tags-usecase";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TagService {
  constructor(
    private createUseCase: CreateTagUseCase,
    private updateUseCase: UpdateTagUseCase,
    private deleteUseCase: DeleteTagUseCase,
    private getTagUseCase: GetTagUseCase,
    private getUserTagsUseCase: GetUserTagsUseCase
  ) {}

  createTag(model: TagModel): Observable<TagModel> {
    return this.createUseCase.execute(model);
  }

  updateTag(id: string, model: TagModel): Observable<TagModel> {
    return this.updateUseCase.execute(id, model);
  }

  deleteTag(tagId: string): Observable<void> {
    return this.deleteUseCase.execute(tagId);
  }

  getTag(id: string): Observable<TagModel> {
    return this.getTagUseCase.execute(id);
  }

  getUserTags(): Observable<TagModel[]> {
    return this.getUserTagsUseCase.execute();
  }
}
