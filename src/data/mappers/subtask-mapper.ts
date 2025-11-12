import { Injectable } from "@angular/core";
import { SubtaskUpdateRequest } from "../models/dtos/subtask/subtask-update-request";
import { SubtaskCreateRequest } from "../models/dtos/subtask/subtask-create-request";
import { SubtaskResponseDto } from "../models/dtos/subtask/subtask-response-dto";

@Injectable({ providedIn: 'root' })
export class SubtaskMapper {
  
  // Domain Entity → DTO
  toCreateRequestDto(request: SubtaskCreateRequest): SubtaskCreateRequest {
    return {

        title: request.title
    }
}

toUpdateRequestDto(request: SubtaskUpdateRequest): SubtaskUpdateRequest {
    return {

        title: request.title
    }
}

// DTO → Domain Entity
toTagResponse(dto: SubtaskResponseDto): SubtaskResponseDto {
    return {

        id : dto.id,
        title: dto.title,
        taskId:dto.taskId
    }
}

// API Response → DTO
toTagResponseDto(apiResponse: any): SubtaskResponseDto {
    return {

        id: apiResponse.id || apiResponse.data?.id,
        title: apiResponse.title || apiResponse.data?.title,
        taskId: apiResponse.taskId || apiResponse.data?.taskId
    }
}
}