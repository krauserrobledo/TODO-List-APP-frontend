import { Injectable, inject } from '@angular/core';
import { TagRepository } from '../../i-repositories/tag-repository';
import { TagModel } from '../../models/tag/tag-model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UpdateTagUseCase {
  private tagRepository = inject(TagRepository);

  execute(id: string, model: TagModel): Observable<TagModel> {
    return this.tagRepository.updateTag(model.id, model);
  }
}
