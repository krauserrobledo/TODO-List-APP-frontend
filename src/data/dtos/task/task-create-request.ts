/**
 * Data Transfer Object representing a request to create a new task.
 */
export interface TaskCreateRequest {
  title: string;
  description?: string;
  dueDate: string | null;
  status: string
}
