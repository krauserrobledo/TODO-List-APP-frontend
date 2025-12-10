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

  //Create Category for current user
  createCategory(model: CategoryModel): Observable<CategoryModel> {
    const dto = this.categoryMapper.toCreateRequestDto(model);
    return this.http.post<CategoryModel>(this.baseUrl, dto).pipe(
      map(apiRes => this.categoryMapper.toCategoryModel(
        this.categoryMapper.toCategoryResponseDto(apiRes)
      ))
    );
  }

  // Update an existing category
  updateCategory(id: string, model: CategoryModel): Observable<CategoryModel> {
    const dto = this.categoryMapper.toUpdateRequestDto(model);
    return this.http.put<CategoryModel>(`${this.baseUrl}/${id}`, dto).pipe(
      map(apiRes => this.categoryMapper.toCategoryModel(
        this.categoryMapper.toCategoryResponseDto(apiRes)
      ))
    );
  }
  //Delete category by Id
  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  //Get categories by user ID
  getUserCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(`${this.baseUrl}/user`).pipe(
      map(apiResponses => apiResponses.map(apiRes =>
        this.categoryMapper.toCategoryModel(
          this.categoryMapper.toCategoryResponseDto(apiRes)
        )
      ))
    );
  }
  // Get category by id
  getCategory(id: string): Observable<CategoryModel> {
    return this.http.get<CategoryModel>(`${this.baseUrl}/${id}`).pipe(
      map(apiRes => this.categoryMapper.toCategoryModel(
        this.categoryMapper.toCategoryResponseDto(apiRes)
      ))
    );
  }
}
