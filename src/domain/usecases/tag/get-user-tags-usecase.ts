import { Injectable, inject } from '@angular/core';
import { TagRepository } from '../../repositories/tag-repository';
import { TagModel } from '../../models/tag/tag-model';

@Injectable({ providedIn: 'root' })
export class GetUserTagUseCase {
  private tagRepository = inject(TagRepository);

  execute(): Promise <TagModel[]> {
    return this.tagRepository.getUserTags();
  }
}
