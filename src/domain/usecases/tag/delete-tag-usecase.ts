import { Injectable, inject } from '@angular/core';
import { TagRepository } from '../../i-repositories/tag-repository';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class DeleteTagUseCase {
  private tagRepository = inject(TagRepository);

  execute( tagId: string): Observable<void> {
    return this.tagRepository.deleteTag(tagId);
  }
}
