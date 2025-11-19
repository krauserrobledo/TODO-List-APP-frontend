import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { CategoryModel } from "../../domain/models/category/category-model";
import { CategoryRepository } from "../../domain/repositories/category-repository";
import { environment } from "../../environments/environment";
import { CategoryMapper } from "../mappers/category-mapper";
import { firstValueFrom } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CategoryApiRepository implements CategoryRepository {

  private http = inject(HttpClient);
  private categoryMapper = inject(CategoryMapper);
  private baseUrl = `${environment.apiUrl}/categories`;

  
  async createCategory(model: CategoryModel): Promise<CategoryModel> {
    const dto = this.categoryMapper.toCreateRequestDto(model);

    const response = await this.http.post<any>(this.baseUrl, dto).toPromise();
    if (!response) throw new Error('Creation failed');

    const categoryResponseDto = this.categoryMapper.toCategoryResponseDto(response);
    return this.categoryMapper.toCategoryModel(categoryResponseDto);
  }


  async updateCategory(id: string, model: CategoryModel): Promise<CategoryModel> {
    const dto = this.categoryMapper.toUpdateRequestDto(model);

    const response = await this.http.put<any>(`${this.baseUrl}/${id}`, dto).toPromise();
    if (!response) throw new Error('Update failed');

    const categoryResponseDto = this.categoryMapper.toCategoryResponseDto(response);
    return this.categoryMapper.toCategoryModel(categoryResponseDto);
  }


  async deleteCategory(id: string): Promise<void> {
    await this.http.delete(`${this.baseUrl}/${id}`).toPromise();
  }


  async getUserCategories(): Promise<CategoryModel[]> {
    const response = await this.http.get<any[]>(`${this.baseUrl}/user`).toPromise();
    if (!response) return [];
    return response.map(dto => this.categoryMapper.toCategoryModel(dto));
  }


  async getCategory(id: string): Promise<CategoryModel> {
    const dto = await firstValueFrom(
      this.http.get<any>(`${this.baseUrl}/${id}`)
    );
  
    return this.categoryMapper.toCategoryModel(dto);
  }
}

