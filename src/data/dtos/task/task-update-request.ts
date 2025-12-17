/**
 * Data Transfer Object representing a request to update an existing task.
 */
export interface TaskUpdateRequest {
  title?: string;
  description?: string;
  dueDate?: Date | string | null;
  status?: string;
}
