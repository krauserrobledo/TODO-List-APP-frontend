import { Injectable, inject } from '@angular/core';
import { TagRepository } from '../../repositories/tag-repository';
@Injectable({ providedIn: 'root' })
export class DeleteTagUseCase {
  private tagRepository = inject(TagRepository);

  execute( tagId: string): void {
    this.tagRepository.deleteTag(tagId);
  }
}
