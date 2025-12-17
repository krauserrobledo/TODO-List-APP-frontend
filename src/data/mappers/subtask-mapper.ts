import { Injectable } from "@angular/core";
import { SubtaskUpdateRequest } from "../dtos/subtask/subtask-update-request";
import { SubtaskCreateRequest } from "../dtos/subtask/subtask-create-request";
import { SubtaskResponseDto } from "../dtos/subtask/subtask-response-dto";
import { SubtaskModel } from "../../domain/models/subtask/subtask-model";

@Injectable({ providedIn: 'root' })
export class SubtaskMapper {
  static toSubtaskModel(subtaskResponseDto: SubtaskResponseDto): import("rxjs").Observable<SubtaskModel> {
    throw new Error("Method not implemented.");
  }

  // Domain Entity → DTO
  toCreateRequestDto(model: SubtaskModel): SubtaskCreateRequest {
    return {

      title: model.title
    }
  }

  toUpdateRequestDto(model: SubtaskModel): SubtaskUpdateRequest {
    return {

      title: model.title
    }
  }

  // DTO → Domain Entity
  toSubtaskModel(dto: SubtaskResponseDto): SubtaskModel {
    return {

      id: dto.id,
      title: dto.title,
      taskId: dto.taskId
    }
  }

  // API Response → DTO
  toSubtaskResponseDto(apiResponse: any): SubtaskResponseDto {
    return {

      id: apiResponse.id ?? apiResponse.data?.id ?? '',
      title: apiResponse.title ?? apiResponse.data?.title ?? '',
      taskId: apiResponse.taskId ?? apiResponse.data?.taskId ?? ''
    }
  }
}
