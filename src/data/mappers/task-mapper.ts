import { Injectable } from "@angular/core";
import { TaskModel } from "../../domain/models/task/task-model";
import { TaskCreateRequest } from "../dtos/task/task-create-request";
import { TaskUpdateRequest } from "../dtos/task/task-update-request";
import { TaskResponseDto } from "../dtos/task/task-response-dto";
import { SubtaskMapper } from "./subtask-mapper";
import { TagMapper } from "./tag-mapper";
import { CategoryMapper } from "./category-mapper";

@Injectable({ providedIn: 'root' })
export class TaskMapper {
  constructor(
    private subtaskMapper: SubtaskMapper,
    private tagMapper: TagMapper,
    private categoryMapper: CategoryMapper
  ) {}

  // Domain → DTO
  toCreateRequestDto(model: TaskModel): TaskCreateRequest {
    return {
      title: model.title,
      description: model.description,
      dueDate: model.dueDate?.toISOString(),
      status: model.status
    };
  }

  toUpdateRequestDto(model: TaskModel): TaskUpdateRequest {
    return {
      title: model.title,
      description: model.description,
      dueDate: model.dueDate?.toISOString(),
      status: model.status
    };
  }

  // DTO → Domain
  toTaskModel(dto: TaskResponseDto): TaskModel {
    return {
      id: dto.id,
      title: dto.title,
      description: dto.description,
      dueDate: dto.dueDate,
      status: dto.status,
      userId: dto.userId,
      subtasks: dto.subtasks?.map(st => this.subtaskMapper.toSubtaskModel(st)) ?? [],
      categories: dto.categories?.map(c => this.categoryMapper.toCategoryModel(c)) ?? [],
      tags: dto.tags?.map(t => this.tagMapper.toTagModel(t)) ?? []
    };
  }

  // API Response → DTO
  toTaskResponseDto(apiResponse: any): TaskResponseDto {
    return {
      id: apiResponse.id ?? apiResponse.data?.id ?? '',
      title: apiResponse.title ?? apiResponse.data?.title ?? '',
      description: apiResponse.description ?? apiResponse.data?.description,
      dueDate: apiResponse.dueDate ?? apiResponse.data?.dueDate,
      status: apiResponse.status ?? apiResponse.data?.status ?? '',
      userId: apiResponse.userId ?? apiResponse.data?.userId ?? '',
      subtasks: apiResponse.subtasks ?? apiResponse.data?.subtasks ?? [],
      categories: apiResponse.categories ?? apiResponse.data?.categories ?? [],
      tags: apiResponse.tags ?? apiResponse.data?.tags ?? []
    };
  }
}