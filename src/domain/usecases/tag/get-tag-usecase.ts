import { Injectable, inject } from '@angular/core';
import { TagRepository } from '../../i-repositories/tag-repository';
import { TagModel } from '../../models/tag/tag-model';
import { Observable } from 'rxjs';

/**
 * Use case for retrieving a tag by its ID.
 */
@Injectable({ providedIn: 'root' })
export class GetTagUseCase {
  private tagRepository = inject(TagRepository);

  execute(id: string): Observable<TagModel> {
    return this.tagRepository.getTag(id);
  }
}
