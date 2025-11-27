import { Injectable, inject } from '@angular/core';
import { TagRepository } from '../../repositories/tag-repository';
import { TagModel } from '../../models/tag/tag-model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CreateTagUseCase {
  private tagRepository = inject(TagRepository);

  execute(model: TagModel): Observable<TagModel> {
    return this.tagRepository.createTag(model);
  }
}
