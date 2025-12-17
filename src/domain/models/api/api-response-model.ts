/**
 * Generic API response model.
 */
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  errors?: string[];
}
