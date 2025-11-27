import { inject, Injectable } from "@angular/core";
import { TaskRepository } from "../../domain/repositories/task-repository";
import { TaskModel } from "../../domain/models/task/task-model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { TaskMapper } from "../mappers/task-mapper";
import { firstValueFrom, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TaskApiRepository implements TaskRepository {

  private http = inject(HttpClient);
  private taskMapper = inject(TaskMapper);
  private baseUrl = `${environment.apiUrl}/tasks`;

  // Create
  createTask(model: TaskModel): Observable<TaskModel> {

    const dto = this.taskMapper.toCreateRequestDto(model);
    return this.http.post<TaskModel>(this.baseUrl, dto);
  }

  //Update
  updateTask(id: string, model: TaskModel): Observable<TaskModel> {

    const dto = this.taskMapper.toUpdateRequestDto(model);
    return this.http.put<TaskModel>(`${this.baseUrl}/${id}`, dto);
  }

  //Delete
  deleteTask(id: string): Observable<void> {

    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  //Get Task
  getTask(id: string): Observable<TaskModel> {

    return this.http.get<TaskModel>(`${this.baseUrl}/${id}`);
  }

  //Get User Task
  getUserTasks(): Observable<TaskModel[]> {

    const token = localStorage.getItem('authToken');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<TaskModel[]>(`${this.baseUrl}/user`, { headers });
  }


  //Add category
  addCategoryToTask(taskId: string, categoryId: string): Observable<TaskModel> {

    return this.http.post<TaskModel>(`${this.baseUrl}/${taskId}/categories/${categoryId}`, {});
  }
  // Add Tags
  addTagToTask(taskId: string, tagId: string): Observable<TaskModel> {

    return this.http.post<TaskModel>(`${this.baseUrl}/${taskId}/tags/${tagId}`, {})
  }
  // Delete Category
  deleteCategoryFromTask(taskId: string, categoryId: string): Observable<TaskModel> {

    return this.http.delete<TaskModel>(`${this.baseUrl}/${taskId}/categories/${categoryId}`);
  }

  // Delete Tags
  deleteTagFromTask(taskId: string, tagId: string): Observable<TaskModel> {

    return this.http.delete<TaskModel>(`${this.baseUrl}/${taskId}/tags/${tagId}`)
  }
}
