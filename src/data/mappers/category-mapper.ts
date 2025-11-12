import { Injectable } from "@angular/core";
import { CategoryCreateRequest } from "../dtos/categories/category-create-request";
import { CategoryUpdateRequest } from "../dtos/categories/category-update-request";
import { CategoryResponseDto } from "../dtos/categories/category-response-dto";

@Injectable({ providedIn: 'root' })
export class CategoryMapper {
  
  // Domain Entity → DTO
  toCreateRequestDto(request: CategoryCreateRequest): CategoryCreateRequest{
    return{

        name: request.name,
        color: request.color
    }
  }

  toupdateRequestDto(request: CategoryUpdateRequest): CategoryUpdateRequest{
    return{

        name: request.name,
        color: request.color
    }
  }

  // DTO → Domain Entity
  toCategoryResponse(dto: CategoryResponseDto): CategoryResponseDto{
    return{

        id: dto.id,
        name: dto.name,
        color: dto.color,
        userId: dto.userId
    }
  }
  
  // API Response → DTO
  toCategoryResopnseDto(apiResponse: any): CategoryResponseDto {
        return {

            id: apiResponse.id || apiResponse.data?.id,
            name: apiResponse.name || apiResponse.data?.name,
            color: apiResponse.color || apiResponse.data?.color,
            userId: apiResponse.userId || apiResponse.data?.userId,
        }
    }
}