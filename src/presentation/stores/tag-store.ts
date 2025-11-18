import { inject, Injectable, signal } from "@angular/core";
import { TagModel } from "../../domain/models/tag/tag-model";
import { TagService } from "../components/tag/service/tag-service";


@Injectable({ providedIn: 'root' })
export class TagStore {
  private tagService = inject(TagService);

  tags = signal<TagModel[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  // CRUD
  async loadTags() {
    this.isLoading.set(true);
    try {
      const result = await this.tagService.getUserTags();
      this.tags.set(result);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }

  async createTag(model: TagModel) {
    try {
      const newTag = await this.tagService.createTag(model);
      this.tags.update(tags => [...tags, newTag]);
    } catch (err: any) {
      this.error.set(err.message);
    }
  }

  async updateTags(id: string, model: TagModel) {
    try {
      const updatedTag = await this.tagService.updateTag(id, model);
      this.tags.update(tags =>
        tags.map(c => (c.id === id ? updatedTag : c))
      );
    } catch (err: any) {
      this.error.set(err.message);
    }
  }

  async deleteTag(id: string) {
    try {
      await this.tagService.deleteTag(id);
      this.tags.update(tags => tags.filter(c => c.id !== id));
    } catch (err: any) {
      this.error.set(err.message);
    }
  }

}
