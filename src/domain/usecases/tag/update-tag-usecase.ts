import { Injectable, inject } from '@angular/core';
import { TagRepository } from '../../repositories/tag-repository';
import { TagModel } from '../../models/tag/tag-model';

@Injectable({ providedIn: 'root' })
export class UpdateTagUseCase {
  private tagRepository = inject(TagRepository);

  execute(model: TagModel): void {
    this.tagRepository.updateTag(model.id, model);
  }
}
