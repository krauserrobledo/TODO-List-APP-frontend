import { Injectable } from "@angular/core";
import { CreateCategoryRequestDto } from "../dtos/category/create-category-request-dto";
import { UpdateCategoryRequestDto } from "../dtos/category/update-category-request-dto";
import { CategoryResponseDto } from "../dtos/category/category-response-dto";
import { CategoryModel } from "../../domain/models/category/category-model";

/**
 * Mapper service to convert between Domain Models and Data Transfer Objects (DTOs) for categories.
 */
@Injectable({ providedIn: 'root' })
export class CategoryMapper {

  // Domain Entity → DTO
  toCreateRequestDto(model: CategoryModel): CreateCategoryRequestDto {
    return {

      name: model.name,
      color: model.color
    }
  }

  toUpdateRequestDto(model: CategoryModel): UpdateCategoryRequestDto {
    return {

      name: model.name,
      color: model.color
    }
  }

  // DTO → Domain Entity
  toCategoryModel(dto: CategoryResponseDto): CategoryModel {
    return {

      id: dto.id,
      name: dto.name,
      color: dto.color,
      userId: dto.userId
    }
  }

  // API Response → DTO
  toCategoryResponseDto(apiResponse: any): CategoryResponseDto {
    return {

      id: apiResponse.id ?? apiResponse.data?.id ?? '',
      name: apiResponse.name ?? apiResponse.data?.name ?? '',
      color: apiResponse.color ?? apiResponse.data?.color ?? '',
      userId: apiResponse.userId ?? apiResponse.data?.userId ?? '',
    }
  }
}
