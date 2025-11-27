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

    const response = await this.http.post<any>(this.baseUrl, dto).toPromise();
    if (!response) throw new Error('Creation failed');

    const taskResponseDto = this.taskMapper.toTaskResponseDto(response);
    return this.taskMapper.toTaskModel(taskResponseDto);
  }

  //Update
  updateTask(id: string, model: TaskModel): Observable<TaskModel> {

    const dto = this.taskMapper.toUpdateRequestDto(model);

    const response = await this.http.put<any>(`${this.baseUrl}/${id}`, dto).toPromise();
    if (!response) throw new Error('Update failed');

    const taskResponseDto = this.taskMapper.toTaskResponseDto(response);
    return this.taskMapper.toTaskModel(taskResponseDto);
  }

  //Delete
  deleteTask(id: string): Observable<void> {
    await firstValueFrom(this.http.delete<void>(`${this.baseUrl}/${id}`));
  }

  //Get Task
  getTask(id: string): Observable<TaskModel> {

    const response = await this.http.get<any>(`${this.baseUrl}/${id}`).toPromise();
    if (!response) throw new Error(`Task with id ${id} not found`);
    const taskResponseDto = this.taskMapper.toTaskResponseDto(response);
    return this.taskMapper.toTaskModel(taskResponseDto);
  }

  //Get User Task
  getUserTasks(): Observable<TaskModel[]> {
    const token = localStorage.getItem('authToken');
    const headers = { Authorization: `Bearer ${token}` };

    const response = await this.http.get<any[]>(`${this.baseUrl}/user`, { headers }).toPromise();
    if (!response) return [];
    return response.map(dto => this.taskMapper.toTaskModel(dto));
  }


  //Add category
  addCategoryToTask(taskId: string, categoryId: string): Observable<TaskModel> {

    const response = await this.http.post<any>(`${this.baseUrl}/${taskId}/categories/${categoryId}`, {}).toPromise();
    const dto = this.taskMapper.toTaskResponseDto(response);
    return this.taskMapper.toTaskModel(dto);
  }
  // Add Tags
  addTagToTask(taskId: string, tagId: string): Observable<TaskModel> {

    const response = await this.http.post<any>(`${this.baseUrl}/${taskId}/tags/${tagId}`, {}).toPromise();
    const dto = this.taskMapper.toTaskResponseDto(response);
    return this.taskMapper.toTaskModel(dto);
  }
  // Delete Category
  deleteCategoryFromTask(taskId: string, categoryId: string): Observable<TaskModel> {

    const response = await this.http.delete<any>(`${this.baseUrl}/${taskId}/categories/${categoryId}`).toPromise();
    const dto = this.taskMapper.toTaskResponseDto(response);
    return this.taskMapper.toTaskModel(dto);
  }

  // Delete Tags
  deleteTagFromTask(taskId: string, tagId: string): Observable<TaskModel> {

    const response = await this.http.delete<any>(`${this.baseUrl}/${taskId}/tags/${tagId}`).toPromise();
    const dto = this.taskMapper.toTaskResponseDto(response);
    return this.taskMapper.toTaskModel(dto);
  }
}
