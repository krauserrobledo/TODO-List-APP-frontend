import { Injectable } from "@angular/core";
import { TagModel } from "../../../../domain/models/tag/tag-model";
import { CreateTagUseCase } from "../../../../domain/usecases/tag/create-tag-usecase";
import { DeleteTagUseCase } from "../../../../domain/usecases/tag/delete-tag-usecase";
import { GetTagUseCase } from "../../../../domain/usecases/tag/get-tag-usecase";
import { UpdateTagUseCase } from "../../../../domain/usecases/tag/update-tag-usecase";
import { GetUserTagsUseCase } from "../../../../domain/usecases/tag/get-user-tags-usecase";

@Injectable({ providedIn: 'root' })
export class Tagervice {
  constructor(
    private createUseCase: CreateTagUseCase,
    private updateUseCase: UpdateTagUseCase,
    private deleteUseCase: DeleteTagUseCase,
    private getTagUseCase: GetTagUseCase,
    private getUserTagsUseCase: GetUserTagsUseCase
  ) {}

  createTag(model: TagModel): Promise<TagModel> {
    return this.createUseCase.execute(model);
  }

  updateTag(id: string, model: TagModel): Promise<TagModel> {
    return this.updateUseCase.execute(id, model);
  }

  deleteTag(tagId: string): void {
    this.deleteUseCase.execute(tagId);
  }

  getTag(id: string): Promise<TagModel> {
    return this.getTagUseCase.execute(id);
  }

  getUserTags(): Promise<TagModel[]> {
    return this.getUserTagsUseCase.execute();
  }
}
