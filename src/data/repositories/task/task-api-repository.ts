import { inject, Injectable } from "@angular/core";
import { TaskRepository } from "../../../domain/repositories/task-repository";
import { TaskModel } from "../../../domain/models/task/task-model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { TaskMapper } from "../../mappers/task-mapper";

@Injectable({ providedIn: 'root' })
export class TaskApiRepository implements TaskRepository {

  private http = inject(HttpClient);
  private taskMapper = inject(TaskMapper);
  private baseUrl = `${environment.apiUrl}/tasks`;

  // Create
  async createTask(model: TaskModel): Promise<TaskModel> {

    const dto = this.taskMapper.toCreateRequestDto(model);

    const response = await this.http.post<any>(this.baseUrl, dto).toPromise();
    if (!response) throw new Error('Creation failed');

    const taskResponseDto = this.taskMapper.toTaskResponseDto(response);
    return this.taskMapper.toTaskModel(taskResponseDto);
  }

  //Update
  async updateTask(id: string, model: TaskModel): Promise<TaskModel> {

    const dto = this.taskMapper.toUpdateRequestDto(model);

    const response = await this.http.put<any>(`${this.baseUrl}/${id}`, dto).toPromise();
    if (!response) throw new Error('Update failed');

    const taskResponseDto = this.taskMapper.toTaskResponseDto(response);
    return this.taskMapper.toTaskModel(taskResponseDto);
  }

  //Delete
  async deleteTask(id: string): Promise<void> {

    await this.http.delete(`${this.baseUrl}/${id}`).toPromise();
  }

  //Get Task
  async getTask(id: string): Promise<TaskModel> {
    const response = await this.http.get<any>(`${this.baseUrl}/${id}`).toPromise();
    if (!response) throw new Error(`Task with id ${id} not found`);

    const taskResponseDto = this.taskMapper.toTaskResponseDto(response);
    return this.taskMapper.toTaskModel(taskResponseDto);
  }

  //Get User Task
  async getUserTasks(): Promise<TaskModel[]> {

    const response = await this.http.get<any[]>(this.baseUrl).toPromise();

    if (!response) return [];
    return response.map(dto => this.taskMapper.toTaskModel(dto));
  }

  //Add category
  async addCategoryToTask(taskId: string, categoryId: string): Promise<void> {
    const response = await this.http.post<any>(
      `${this.baseUrl}/${taskId}/categories/${categoryId}`, {}
    ).toPromise();

    if (!response) throw new Error('Add category failed');

    const taskResponseDto = this.taskMapper.toTaskResponseDto(response);
    this.taskMapper.toTaskModel(taskResponseDto);
  }

  // Add Task
  async addTagToTask(taskId: string, tagId: string): Promise<void> {
    const response = await this.http.post<any>(
      `${this.baseUrl}/${taskId}/tags/${tagId}`, {}
    ).toPromise();

    if (!response) throw new Error('Add tag failed');

    const taskResponseDto = this.taskMapper.toTaskResponseDto(response);
    this.taskMapper.toTaskModel(taskResponseDto);
  }

  // Delete Category
  async deleteCategoryFromTask(taskId: string, categoryId: string): Promise<void> {
    const response = await this.http.delete<any>(
      `${this.baseUrl}/${taskId}/categories/${categoryId}`
    ).toPromise();

    if (!response) throw new Error('Delete category failed');

    const taskResponseDto = this.taskMapper.toTaskResponseDto(response);
    this.taskMapper.toTaskModel(taskResponseDto);
  }

  //Delete Tag
  async deleteTagFromTask(taskId: string, tagId: string): Promise<void> {
    const response = await this.http.delete<any>(
      `${this.baseUrl}/${taskId}/tags/${tagId}`
    ).toPromise();

    if (!response) throw new Error('Delete tag failed');

    const taskResponseDto = this.taskMapper.toTaskResponseDto(response);
    this.taskMapper.toTaskModel(taskResponseDto);
  }
}
