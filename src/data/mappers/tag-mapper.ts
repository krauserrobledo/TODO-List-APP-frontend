import { Injectable } from "@angular/core";
import { TagCreateRequest } from "../dtos/tag/tag-create-request";
import { TagUpdateRequest } from "../dtos/tag/tag-update-request";
import { TagResponseDto } from "../dtos/tag/tag-response-dto";

@Injectable({ providedIn: 'root' })
export class TagMapper {

    // Domain Entity → DTO
    toCreateRequestDto(request: TagCreateRequest): TagCreateRequest {
        return {

            name: request.name
        }
    }

    toUpdateRequestDto(request: TagUpdateRequest): TagUpdateRequest {
        return {

            name: request.name
        }
    }

    // DTO → Domain Entity
    toTagResponse(dto: TagResponseDto): TagResponseDto {
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