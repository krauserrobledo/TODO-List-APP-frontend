import { inject, Injectable, model } from "@angular/core";
import { TagRepository } from "../../domain/repositories/tag-repository";
import { TagModel } from "../../domain/models/tag/tag-model";
import { TagMapper } from "../mappers/tag-mapper";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { firstValueFrom, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TagApiRepository implements TagRepository {

    private http = inject(HttpClient);
    private tagMapper = inject(TagMapper);
    private baseUrl = `${environment.apiUrl}/tags`;


    createTag(model: TagModel): Observable<TagModel> {
    
        const dto = this.tagMapper.toCreateRequestDto(model);
        return this.http.post<TagModel>(this.baseUrl, dto);
    }


    updateTag(id: string, model: TagModel): Observable<TagModel> {

        const dto = this.tagMapper.toUpdateRequestDto(model);
        return this.http.put<TagModel>(`${this.baseUrl}/${id}`, dto);
    }


    deleteTag(id: string): Observable<void> {

        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }


    getUserTags(): Observable<TagModel[]> {
        
        return this.http.get<TagModel[]>(`${this.baseUrl}/user`);
    }
    

    getTag(id: string): Observable<TagModel> {
       
        return this.http.get<TagModel>(`${this.baseUrl}/${id}`)
    }
}