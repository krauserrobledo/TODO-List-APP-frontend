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

        const response = await this.http.post<any>(`${this.baseUrl}/task/${taskId}`, dto).toPromise();
        if (!response) throw new Error('Creation failed');

        const subtaskResponseDto = this.subtaskMapper.toSubtaskResponseDto(response);
        return this.subtaskMapper.toSubtaskModel(subtaskResponseDto);
    }


    updateSubtask(id: string, model: SubtaskModel): Observable<SubtaskModel> {

        const dto = this.subtaskMapper.toUpdateRequestDto(model);

        const response = await this.http.put<any>(`${this.baseUrl}/${id}`, dto).toPromise();

        if (!response) throw new Error('Update failed');

        const subtaskResponseDto = this.subtaskMapper.toSubtaskResponseDto(response);

        return this.subtaskMapper.toSubtaskModel(subtaskResponseDto);
    }


    deleteSubtask(id: string): Observable<void> {

        await this.http.delete(`${this.baseUrl}/${id}`).toPromise();
    }

    getSubtask(id: string): Observable<SubtaskModel> {

        const dto = await firstValueFrom(

            this.http.get<any>(`${this.baseUrl}/${id}`)
        );

        return this.subtaskMapper.toSubtaskModel(dto);
    }


    getTaskSubtasks(taskId: string): Observable<SubtaskModel[]> {
        const response = await this.http.get<any[]>(`${this.baseUrl}/task/${taskId}`).toPromise();
        if (!response) return [];
        return response.map(dto => this.subtaskMapper.toSubtaskModel(dto));
    }

}

