import { Injectable, inject } from '@angular/core';
import { TagRepository } from '../../i-repositories/tag-repository';
import { TagModel } from '../../models/tag/tag-model';
import { Observable } from 'rxjs';

/**
 * Use case for creating a new tag.
 */
@Injectable({ providedIn: 'root' })
export class CreateTagUseCase {
  private tagRepository = inject(TagRepository);

  execute(model: TagModel): Observable<TagModel> {
    return this.tagRepository.createTag(model);
  }
}
