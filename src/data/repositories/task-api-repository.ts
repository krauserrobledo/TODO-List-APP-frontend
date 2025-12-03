import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskRepository } from '../../domain/i-repositories/task-repository';
import { TaskModel } from '../../domain/models/task/task-model';
import { environment } from '../../environments/environment';
import { TaskMapper } from '../mappers/task-mapper';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskApiRepository implements TaskRepository {
  private http = inject(HttpClient);
  private taskMapper = inject(TaskMapper);
  private baseUrl = `${environment.apiUrl}/tasks`;

  // Helper: attach auth headers consistently
  private authHeaders(): { [key: string]: string } {
    const token = localStorage.getItem('authToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Create
  createTask(model: TaskModel): Observable<TaskModel> {
    const dto = this.taskMapper.toCreateRequestDto(model);
    return this.http.post<TaskModel>(this.baseUrl, dto, { headers: this.authHeaders() }).pipe(
      map(apiRes => this.taskMapper.toTaskModel(
        this.taskMapper.toTaskResponseDto(apiRes)
      ))
    );
  }

  // Update
  updateTask(id: string, model: TaskModel): Observable<TaskModel> {
    const dto = this.taskMapper.toUpdateRequestDto(model);
    return this.http.put<TaskModel>(`${this.baseUrl}/${id}`, dto, { headers: this.authHeaders() }).pipe(
      map(apiRes => this.taskMapper.toTaskModel(
        this.taskMapper.toTaskResponseDto(apiRes)
      ))
    );
  }

  // Delete
  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.authHeaders() });
  }

  // Get single task
  getTask(id: string): Observable<TaskModel> {
    return this.http.get<TaskModel>(`${this.baseUrl}/${id}`, { headers: this.authHeaders() }).pipe(
      map(apiRes => this.taskMapper.toTaskModel(
        this.taskMapper.toTaskResponseDto(apiRes)
      ))
    );
  }

  // Get tasks for current user
  getUserTasks(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(`${this.baseUrl}/user`, { headers: this.authHeaders() }).pipe(
      map(apiResponses =>
        apiResponses.map(apiRes =>
          this.taskMapper.toTaskModel(
            this.taskMapper.toTaskResponseDto(apiRes)
          )
        )
      )
    );
  }

  // Add category to task (returns updated task)
  addCategoryToTask(taskId: string, categoryId: string): Observable<TaskModel> {
    return this.http.post<TaskModel>(`${this.baseUrl}/${taskId}/categories/${categoryId}`, {}, { headers: this.authHeaders() }).pipe(
      map(apiRes => this.taskMapper.toTaskModel(
        this.taskMapper.toTaskResponseDto(apiRes)
      ))
    );
  }

  // Remove category from task (returns updated task)
  deleteCategoryFromTask(taskId: string, categoryId: string): Observable<TaskModel> {
    return this.http.delete<TaskModel>(`${this.baseUrl}/${taskId}/categories/${categoryId}`, { headers: this.authHeaders() }).pipe(
      map(apiRes => this.taskMapper.toTaskModel(
        this.taskMapper.toTaskResponseDto(apiRes)
      ))
    );
  }

  // Add tag to task (returns updated task)
  addTagToTask(taskId: string, tagId: string): Observable<TaskModel> {
    return this.http.post<TaskModel>(`${this.baseUrl}/${taskId}/tags/${tagId}`, {}, { headers: this.authHeaders() }).pipe(
      map(apiRes => this.taskMapper.toTaskModel(
        this.taskMapper.toTaskResponseDto(apiRes)
      ))
    );
  }

  // Remove tag from task (returns updated task)
  deleteTagFromTask(taskId: string, tagId: string): Observable<TaskModel> {
    return this.http.delete<TaskModel>(`${this.baseUrl}/${taskId}/tags/${tagId}`, { headers: this.authHeaders() }).pipe(
      map(apiRes => this.taskMapper.toTaskModel(
        this.taskMapper.toTaskResponseDto(apiRes)
      ))
    );
  }
}
