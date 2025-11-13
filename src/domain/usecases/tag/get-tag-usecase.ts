import { Injectable, inject } from '@angular/core';
import { TagRepository } from '../../repositories/tag-repository';
import { TagModel } from '../../models/tag/tag-model';

@Injectable({ providedIn: 'root' })
export class GetTagUseCase {
  private tagRepository = inject(TagRepository);

  execute(model: TagModel): Promise <TagModel> {
    return this.tagRepository.getTag(model.id);
  }
}
