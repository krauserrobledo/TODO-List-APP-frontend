import { map, Observable } from "rxjs";
import { TagModel } from "../../domain/models/tag/tag-model";
import { inject, Injectable } from "@angular/core";
import { TagRepository } from "../../domain/i-repositories/tag-repository";
import { HttpClient } from "@angular/common/http";
import { TagMapper } from "../mappers/tag-mapper";
import { environment } from "../../environments/environment";

/**
 * API repository implementation for managing tags.
 */
@Injectable({ providedIn: 'root' })
export class TagApiRepository implements TagRepository {
  private http = inject(HttpClient);
  private tagMapper = inject(TagMapper);
  private baseUrl = `${environment.apiUrl}/tags`;

  // Create a tag for current user
  createTag(model: TagModel): Observable<TagModel> {
    const dto = this.tagMapper.toCreateRequestDto(model);
    return this.http.post<TagModel>(this.baseUrl, dto).pipe(
      map(apiRes => this.tagMapper.toTagModel(
        this.tagMapper.toTagResponseDto(apiRes)
      ))
    );
  }

  // Update an existing Tag for current user
  updateTag(id: string, model: TagModel): Observable<TagModel> {
    const dto = this.tagMapper.toUpdateRequestDto(model);
    return this.http.put<TagModel>(`${this.baseUrl}/${id}`, dto).pipe(
      map(apiRes => this.tagMapper.toTagModel(
        this.tagMapper.toTagResponseDto(apiRes)
      ))
    );
  }

  // Delete an existing user Tag
  deleteTag(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  //Get tags by user
  getUserTags(): Observable<TagModel[]> {
    return this.http.get<TagModel[]>(`${this.baseUrl}/user`).pipe(
      map(apiResponses => apiResponses.map(apiRes =>
        this.tagMapper.toTagModel(
          this.tagMapper.toTagResponseDto(apiRes)
        )
      ))
    );
  }

  //Get a tag by Id
  getTag(id: string): Observable<TagModel> {
    return this.http.get<TagModel>(`${this.baseUrl}/${id}`).pipe(
      map(apiRes => this.tagMapper.toTagModel(
        this.tagMapper.toTagResponseDto(apiRes)
      ))
    );
  }
}
