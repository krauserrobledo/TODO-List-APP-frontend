import { Injectable } from "@angular/core";
import { TaskModel } from "../../domain/models/task/task-model";
import { TaskCreateRequest } from "../dtos/task/task-create-request";
import { TaskUpdateRequest } from "../dtos/task/task-update-request";
import { TaskResponseDto } from "../dtos/task/task-response-dto";
import { SubtaskMapper } from "./subtask-mapper";
import { TagMapper } from "./tag-mapper";
import { CategoryMapper } from "./category-mapper";

/**
 * Mapper service to convert between Domain Models and Data Transfer Objects (DTOs) for tasks.
 */
@Injectable({ providedIn: 'root' })
export class TaskMapper {
  constructor(
    private subtaskMapper: SubtaskMapper,
    private tagMapper: TagMapper,
    private categoryMapper: CategoryMapper
  ) { }

  // Domain → DTO
  toCreateRequestDto(model: TaskModel): TaskCreateRequest {
    return {
      title: model.title,
      description: model.description,
      dueDate: model.dueDate ? new Date(model.dueDate).toISOString() : null,
      status: model.status
    };
  }

  toUpdateRequestDto(model: TaskModel): TaskUpdateRequest {
    return {
      title: model.title,
      description: model.description,
      dueDate: model.dueDate ? new Date(model.dueDate).toISOString() : null,
      status: model.status,
    };
  }

  // DTO → Domain
  toTaskModel(dto: TaskResponseDto): TaskModel {
    return {
      id: dto.id,
      userId: dto.userId,
      title: dto.title,
      description: dto.description,
      dueDate: dto.dueDate,
      status: dto.status,
      subtasks: dto.subtasks?.map(st => this.subtaskMapper.toSubtaskModel(st)) ?? [],
      categories: dto.categories?.map(c => this.categoryMapper.toCategoryModel(c)) ?? [],
      tags: dto.tags?.map(t => this.tagMapper.toTagModel(t)) ?? []
    };
  }

  // API Response → DTO
  toTaskResponseDto(apiResponse: any): TaskResponseDto {
    return {
      id: apiResponse.id ?? '',
      userId: apiResponse.userId ?? '',
      title: apiResponse.title ?? '',
      description: apiResponse.description,
      dueDate: apiResponse.dueDate,
      status: apiResponse.status ?? '',
      subtasks: apiResponse.subtasks ?? [],
      categories: apiResponse.categories ?? [],
      tags: apiResponse.tags ?? []
    };
  }
}

