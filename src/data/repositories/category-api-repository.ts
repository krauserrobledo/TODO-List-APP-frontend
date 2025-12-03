import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { CategoryModel } from "../../domain/models/category/category-model";
import { CategoryRepository } from "../../domain/i-repositories/category-repository";
import { environment } from "../../environments/environment";
import { CategoryMapper } from "../mappers/category-mapper";
import { map, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CategoryApiRepository implements CategoryRepository {
  private http = inject(HttpClient);
  private categoryMapper = inject(CategoryMapper);
  private baseUrl = `${environment.apiUrl}/categories`;

  createCategory(model: CategoryModel): Observable<CategoryModel> {
    const dto = this.categoryMapper.toCreateRequestDto(model);
    return this.http.post<CategoryModel>(this.baseUrl, dto).pipe(
      map(apiRes => this.categoryMapper.toCategoryModel(
        this.categoryMapper.toCategoryResponseDto(apiRes)
      ))
    );
  }

  updateCategory(id: string, model: CategoryModel): Observable<CategoryModel> {
    const dto = this.categoryMapper.toUpdateRequestDto(model);
    return this.http.put<CategoryModel>(`${this.baseUrl}/${id}`, dto).pipe(
      map(apiRes => this.categoryMapper.toCategoryModel(
        this.categoryMapper.toCategoryResponseDto(apiRes)
      ))
    );
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getUserCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(`${this.baseUrl}/user`).pipe(
      map(apiResponses => apiResponses.map(apiRes =>
        this.categoryMapper.toCategoryModel(
          this.categoryMapper.toCategoryResponseDto(apiRes)
        )
      ))
    );
  }

  getCategory(id: string): Observable<CategoryModel> {
    return this.http.get<CategoryModel>(`${this.baseUrl}/${id}`).pipe(
      map(apiRes => this.categoryMapper.toCategoryModel(
        this.categoryMapper.toCategoryResponseDto(apiRes)
      ))
    );
  }
}
