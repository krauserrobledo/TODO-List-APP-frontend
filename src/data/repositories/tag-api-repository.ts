import { inject, Injectable, model } from "@angular/core";
import { TagRepository } from "../../domain/repositories/tag-repository";
import { TagModel } from "../../domain/models/tag/tag-model";
import { TagMapper } from "../mappers/tag-mapper";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { firstValueFrom } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TagApiRepository implements TagRepository {

    private http = inject(HttpClient);
    private tagMapper = inject(TagMapper);
    private baseUrl = `${environment.apiUrl}/tags`;


    async createTag(model: TagModel): Promise<TagModel> {
        const dto = this.tagMapper.toCreateRequestDto(model);

        const response = await this.http.post<any>(this.baseUrl, dto).toPromise();
        if (!response) throw new Error('Creation failed');

        const tagResponseDto = this.tagMapper.toTagResponseDto(response);
        return this.tagMapper.toTagModel(tagResponseDto);
    }


    async updateTag(id: string, model: TagModel): Promise<TagModel> {

        const dto = this.tagMapper.toUpdateRequestDto(model);

        const response = await this.http.put<any>(`${this.baseUrl}/${id}`, dto).toPromise();
        if (!response) throw new Error('Update failed');

        const tagResponseDto = this.tagMapper.toTagResponseDto(response);
        return this.tagMapper.toTagModel(tagResponseDto);
    }


    async deleteTag(id: string): Promise<void> {
        await this.http.delete(`${this.baseUrl}/${id}`).toPromise();
    }


    async getUserTags(): Promise<TagModel[]> {
        const response = await this.http.get<any[]>(`${this.baseUrl}/user`).toPromise();
        if (!response) return [];
        return response.map(dto => this.tagMapper.toTagModel(dto));
    }
    

    async getTag(id: string): Promise<TagModel> {
        const dto = await firstValueFrom(
            this.http.get<any>(`${this.baseUrl}/${id}`)
        );

        return this.tagMapper.toTagModel(dto);
    }
}