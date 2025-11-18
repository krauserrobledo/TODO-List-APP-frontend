import { Injectable, inject } from '@angular/core';
import { TagRepository } from '../../repositories/tag-repository';
import { TagModel } from '../../models/tag/tag-model';

@Injectable({ providedIn: 'root' })
export class UpdateTagUseCase {
  private tagRepository = inject(TagRepository);

  execute(id: string, model: TagModel): Promise<TagModel> {
    return this.tagRepository.updateTag(model.id, model);
  }
}
