import { Injectable, inject } from '@angular/core';
import { TagRepository } from '../../repositories/tag-repository';
import { TagModel } from '../../models/tag/tag-model';

@Injectable({ providedIn: 'root' })
export class GetTagUseCase {
  private tagRepository = inject(TagRepository);

  execute(id : string): Promise <TagModel> {
    return this.tagRepository.getTag(id);
  }
}
