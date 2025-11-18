import { inject, Injectable } from "@angular/core";
import { SubtaskRepository } from "../../domain/repositories/subtask-repository";
import { SubtaskModel } from "../../domain/models/subtask/subtask-model";
import { HttpClient } from "@angular/common/http";
import { SubtaskMapper } from "../mappers/subtask-mapper";
import { environment } from "../../environments/environment";
import { firstValueFrom } from "rxjs";

@Injectable({ providedIn: 'root' })
export class SubtaskApiRepository implements SubtaskRepository {

    private http = inject(HttpClient);
    private subtaskMapper = inject(SubtaskMapper);
    private baseUrl = `${environment.apiUrl}/subtasks`;


    async createSubtask(taskId: string, model: SubtaskModel): Promise<SubtaskModel> {
        const dto = this.subtaskMapper.toCreateRequestDto(model);

        const response = await this.http.post<any>(`${this.baseUrl}/task/${taskId}`, dto).toPromise();
        if (!response) throw new Error('Creation failed');

        const subtaskResponseDto = this.subtaskMapper.toSubtaskResponseDto(response);
        return this.subtaskMapper.toSubtaskModel(subtaskResponseDto);
    }


    async updateSubtask(id: string, model: SubtaskModel): Promise<SubtaskModel> {

        const dto = this.subtaskMapper.toUpdateRequestDto(model);

        const response = await this.http.put<any>(`${this.baseUrl}/${id}`, dto).toPromise();

        if (!response) throw new Error('Update failed');

        const subtaskResponseDto = this.subtaskMapper.toSubtaskResponseDto(response);

        return this.subtaskMapper.toSubtaskModel(subtaskResponseDto);
    }


    async deleteSubtask(id: string): Promise<void> {

        await this.http.delete(`${this.baseUrl}/${id}`).toPromise();
    }

    async getSubtask(id: string): Promise<SubtaskModel> {

        const dto = await firstValueFrom(

            this.http.get<any>(`${this.baseUrl}/${id}`)
        );

        return this.subtaskMapper.toSubtaskModel(dto);
    }


    async getTaskSubtasks(taskId: string): Promise<SubtaskModel[]> {
        const response = await this.http.get<any[]>(`${this.baseUrl}/task/${taskId}`).toPromise();
        if (!response) return [];
        return response.map(dto => this.subtaskMapper.toSubtaskModel(dto));
    }

}

