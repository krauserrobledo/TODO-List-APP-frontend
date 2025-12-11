export interface TaskUpdateRequest {
    title?: string;
    description?: string;
    dueDate?: Date | string | null;
    status?: string;
    categoryIds?: string[];
    tagIds?: string[];
  }
  