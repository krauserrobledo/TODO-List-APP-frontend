import { inject, Injectable } from "@angular/core";
import { SubtaskRepository } from "../../domain/i-repositories/subtask-repository";
import { SubtaskModel } from "../../domain/models/subtask/subtask-model";
import { HttpClient } from "@angular/common/http";
import { SubtaskMapper } from "../mappers/subtask-mapper";
import { environment } from "../../environments/environment";
import { firstValueFrom, map, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class SubtaskApiRepository implements SubtaskRepository {
  private http = inject(HttpClient);
  private subtaskMapper = inject(SubtaskMapper);
  private baseUrl = `${environment.apiUrl}/subtasks`;

  // Create subtask for a Task
  createSubtask(taskId: string, model: SubtaskModel): Observable<SubtaskModel> {
    const dto = this.subtaskMapper.toCreateRequestDto(model);
    return this.http.post<SubtaskModel>(`${this.baseUrl}/task/${taskId}`, dto).pipe(
      map(apiRes => this.subtaskMapper.toSubtaskModel(
        this.subtaskMapper.toSubtaskResponseDto(apiRes)
      ))
    );
  }
  //Update existing subtask
  updateSubtask(id: string, model: SubtaskModel): Observable<SubtaskModel> {
    const dto = this.subtaskMapper.toUpdateRequestDto(model);
    return this.http.put<SubtaskModel>(`${this.baseUrl}/${id}`, dto).pipe(
      map(apiRes => this.subtaskMapper.toSubtaskModel(
        this.subtaskMapper.toSubtaskResponseDto(apiRes)
      ))
    );
  }
  //Delete a existing subtask
  deleteSubtask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //Get a subtask by id
  getSubtask(id: string): Observable<SubtaskModel> {
    return this.http.get<SubtaskModel>(`${this.baseUrl}/${id}`).pipe(
      map(apiRes => this.subtaskMapper.toSubtaskModel(
        this.subtaskMapper.toSubtaskResponseDto(apiRes)
      ))
    );
  }
  //Get all subtask by task
  getTaskSubtasks(taskId: string): Observable<SubtaskModel[]> {
    return this.http.get<SubtaskModel[]>(`${this.baseUrl}/task/${taskId}`).pipe(
      map(apiResponses => apiResponses.map(apiRes =>
        this.subtaskMapper.toSubtaskModel(
          this.subtaskMapper.toSubtaskResponseDto(apiRes)
        )
      ))
    );
  }
}
