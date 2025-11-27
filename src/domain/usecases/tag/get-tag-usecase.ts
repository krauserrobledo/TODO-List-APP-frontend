import { Injectable, inject } from '@angular/core';
import { TagRepository } from '../../repositories/tag-repository';
import { TagModel } from '../../models/tag/tag-model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetTagUseCase {
  private tagRepository = inject(TagRepository);

  execute(id : string): Observable <TagModel> {
    return this.tagRepository.getTag(id);
  }
}
