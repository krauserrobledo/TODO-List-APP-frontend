import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { CategoryModel } from "../../domain/models/category/category-model";
import { CategoryRepository } from "../../domain/repositories/category-repository";
import { environment } from "../../environments/environment";
import { CategoryMapper } from "../mappers/category-mapper";
import { firstValueFrom, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CategoryApiRepository implements CategoryRepository {

  private http = inject(HttpClient);
  private categoryMapper = inject(CategoryMapper);
  private baseUrl = `${environment.apiUrl}/categories`;

  
  createCategory(model: CategoryModel): Observable<CategoryModel> {
    const dto = this.categoryMapper.toCreateRequestDto(model);

    const response = await this.http.post<any>(this.baseUrl, dto).toPromise();
    if (!response) throw new Error('Creation failed');

    const categoryResponseDto = this.categoryMapper.toCategoryResponseDto(response);
    return this.categoryMapper.toCategoryModel(categoryResponseDto);
  }


  updateCategory(id: string, model: CategoryModel): Observable<CategoryModel> {
    const dto = this.categoryMapper.toUpdateRequestDto(model);

    const response = await this.http.put<any>(`${this.baseUrl}/${id}`, dto).firsValueFrom();
    if (!response) throw new Error('Update failed');

    const categoryResponseDto = this.categoryMapper.toCategoryResponseDto(response);
    return this.categoryMapper.toCategoryModel(categoryResponseDto);
  }

  deleteCategory(id: string): Observable<void> {
    return await this.http.delete(`${this.baseUrl}/${id}`).toPromise() ?? "";
  }


  getUserCategories(): Observable<CategoryModel[]> {
    const response = await this.http.get<any[]>(`${this.baseUrl}/user`).toPromise();
    if (!response) return [];
    return response.map(dto => this.categoryMapper.toCategoryModel(dto));
  }


  getCategory(id: string): Observable<CategoryModel> {
    const dto = await firstValueFrom(
      this.http.get<any>(`${this.baseUrl}/${id}`)
    );
  
    return this.categoryMapper.toCategoryModel(dto);
  }
}

