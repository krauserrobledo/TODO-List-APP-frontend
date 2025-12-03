import { map, Observable } from "rxjs";
import { TagModel } from "../../domain/models/tag/tag-model";
import { inject, Injectable } from "@angular/core";
import { TagRepository } from "../../domain/i-repositories/tag-repository";
import { HttpClient } from "@angular/common/http";
import { TagMapper } from "../mappers/tag-mapper";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class TagApiRepository implements TagRepository {
  private http = inject(HttpClient);
  private tagMapper = inject(TagMapper);
  private baseUrl = `${environment.apiUrl}/tags`;

  createTag(model: TagModel): Observable<TagModel> {
    const dto = this.tagMapper.toCreateRequestDto(model);
    return this.http.post<TagModel>(this.baseUrl, dto).pipe(
      map(apiRes => this.tagMapper.toTagModel(
        this.tagMapper.toTagResponseDto(apiRes)
      ))
    );
  }

  updateTag(id: string, model: TagModel): Observable<TagModel> {
    const dto = this.tagMapper.toUpdateRequestDto(model);
    return this.http.put<TagModel>(`${this.baseUrl}/${id}`, dto).pipe(
      map(apiRes => this.tagMapper.toTagModel(
        this.tagMapper.toTagResponseDto(apiRes)
      ))
    );
  }

  deleteTag(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getUserTags(): Observable<TagModel[]> {
    return this.http.get<TagModel[]>(`${this.baseUrl}/user`).pipe(
      map(apiResponses => apiResponses.map(apiRes =>
        this.tagMapper.toTagModel(
          this.tagMapper.toTagResponseDto(apiRes)
        )
      ))
    );
  }

  getTag(id: string): Observable<TagModel> {
    return this.http.get<TagModel>(`${this.baseUrl}/${id}`).pipe(
      map(apiRes => this.tagMapper.toTagModel(
        this.tagMapper.toTagResponseDto(apiRes)
      ))
    );
  }
}
