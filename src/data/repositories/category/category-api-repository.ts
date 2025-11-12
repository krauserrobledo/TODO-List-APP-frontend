import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { CategoryModel } from "../../../domain/models/category/category-model";
import { CategoryRepository } from "../../../domain/repositories/category-repository";
import { environment } from "../../../environments/environment";
import { CreateCategoryRequestDto } from "../../dtos/categories/create-category-request-dto";
import { UpdateCategoryRequestDto } from "../../dtos/categories/update-category-request-dto";
import { CategoryResponseDto } from "../../dtos/categories/category-response-dto";
import { CategoryMapper } from "../../mappers/category-mapper";

@Injectable({ providedIn: 'root' })
export class CategoryApiRepository implements CategoryRepository {

  private http = inject(HttpClient);
  private categoryMapper = inject(CategoryMapper)
  private baseUrl = `${environment.apiUrl}/categories`;

  async createCategory(request: CreateCategoryRequestDto): Promise<CategoryModel> {

    const response = await this.http.post<any>(this.baseUrl, request).toPromise();

    if (!response) throw new Error('Creation failed');

    const dto = this.categoryMapper.toCategoryResponseDto(response);

    return this.categoryMapper.toCategoryModel(dto);
  }

  async updateCategory(id: string, request: UpdateCategoryRequestDto): Promise<CategoryModel> {

    const response = await this.http.put<any>(`${this.baseUrl}/${id}`, request).toPromise();

    if (!response) throw new Error('Update failed');

    const dto = this.categoryMapper.toCategoryResponseDto(response);
    
    return this.categoryMapper.toCategoryModel(dto);
}


  async deleteCategory(id: string): Promise<void> {
    await this.http.delete(`${this.baseUrl}/${id}`).toPromise();
  }

  async getUserCategories(): Promise<CategoryModel[]> {
    const response = await this.http.get<any[]>(this.baseUrl).toPromise();
    if (!response) return [];
    return response.map(dto => this.categoryMapper.toCategoryModel(dto));
  }
}
