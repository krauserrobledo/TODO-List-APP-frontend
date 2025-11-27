import { inject, Injectable } from "@angular/core";
import { SubtaskRepository } from "../../domain/repositories/subtask-repository";
import { SubtaskModel } from "../../domain/models/subtask/subtask-model";
import { HttpClient } from "@angular/common/http";
import { SubtaskMapper } from "../mappers/subtask-mapper";
import { environment } from "../../environments/environment";
import { firstValueFrom, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class SubtaskApiRepository implements SubtaskRepository {

    private http = inject(HttpClient);
    private subtaskMapper = inject(SubtaskMapper);
    private baseUrl = `${environment.apiUrl}/subtasks`;


    createSubtask(taskId: string, model: SubtaskModel): Observable<SubtaskModel> {
        
        const dto = this.subtaskMapper.toCreateRequestDto(model);

        return this.http.post<SubtaskModel>(`${this.baseUrl}/task/${taskId}`, dto);
    }


    updateSubtask(id: string, model: SubtaskModel): Observable<SubtaskModel> {

        const dto = this.subtaskMapper.toUpdateRequestDto(model)

        return this.http.put<SubtaskModel>(`${this.baseUrl}/${id}`, dto);
    }


    deleteSubtask(id: string): Observable<void> {

        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    getSubtask(id: string): Observable<SubtaskModel> {

        return this.http.get<SubtaskModel>(`${this.baseUrl}/${id}`);
    }


    getTaskSubtasks(taskId: string): Observable<SubtaskModel[]> {

        return this.http.get<SubtaskModel[]>(`${this.baseUrl}/task/${taskId}`);
    }

}

