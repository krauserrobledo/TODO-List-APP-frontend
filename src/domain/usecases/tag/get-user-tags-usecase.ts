import { Injectable, inject } from '@angular/core';
import { TagRepository } from '../../i-repositories/tag-repository';
import { TagModel } from '../../models/tag/tag-model';
import { Observable } from 'rxjs';

/**
 * Use case for retrieving all tags of the current user.
 */
@Injectable({ providedIn: 'root' })
export class GetUserTagsUseCase {
  private tagRepository = inject(TagRepository);

  execute(): Observable<TagModel[]> {
    return this.tagRepository.getUserTags();
  }
}
