import { Injectable } from "@angular/core";
import { TagCreateRequest } from "../dtos/tag/tag-create-request";
import { TagUpdateRequest } from "../dtos/tag/tag-update-request";
import { TagResponseDto } from "../dtos/tag/tag-response-dto";
import { TagModel } from "../../domain/models/tag/tag-model";

/**
 * Mapper service to convert between Domain Models and Data Transfer Objects (DTOs) for tags.
 */
@Injectable({ providedIn: 'root' })
export class TagMapper {

  // Domain Entity → DTO
  toCreateRequestDto(model: TagModel): TagCreateRequest {
    return {

      name: model.name
    }
  }

  toUpdateRequestDto(model: TagModel): TagUpdateRequest {
    return {

      name: model.name
    }
  }

  // DTO → Domain Entity
  toTagModel(dto: TagResponseDto): TagModel {
    return {

      id: dto.id,
      name: dto.name,
      userId: dto.userId
    }
  }

  // API Response → DTO
  toTagResponseDto(apiResponse: any): TagResponseDto {
    return {

      id: apiResponse.id || apiResponse.data?.id,
      name: apiResponse.name || apiResponse.data?.name,
      userId: apiResponse.userId || apiResponse.data?.userId
    }
  }
}
