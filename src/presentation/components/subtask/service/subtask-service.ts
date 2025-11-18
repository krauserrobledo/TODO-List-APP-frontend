import { Injectable } from "@angular/core";
import { SubtaskModel } from "../../../../domain/models/subtask/subtask-model";
import { CreateSubtaskUseCase } from "../../../../domain/usecases/subtask/create-subtask-usecase";
import { DeleteSubtaskUseCase } from "../../../../domain/usecases/subtask/delete-subtask-usecase";
import { GetSubtaskUseCase } from "../../../../domain/usecases/subtask/get-subtask-usecase";
import { UpdateSubtaskUseCase } from "../../../../domain/usecases/subtask/update-subtask-usecase";
import { GetTaskSubtasksUseCase } from "../../../../domain/usecases/subtask/get-task-subtask-usecase";


@Injectable({ providedIn: 'root' })
export class SubtaskService {
  constructor(
    private createUseCase: CreateSubtaskUseCase,
    private updateUseCase: UpdateSubtaskUseCase,
    private deleteUseCase: DeleteSubtaskUseCase,
    private getUseCase: GetSubtaskUseCase,
    private getSubtasksUseCase: GetTaskSubtasksUseCase
  ) {}

  createTag(model: SubtaskModel): Promise<SubtaskModel> {
    return this.createUseCase.execute(model);
  }

  updateTag(id: string, model: SubtaskModel): Promise<SubtaskModel> {
    return this.updateUseCase.execute(id, model);
  }

  deleteTag(id: string): void {
    this.deleteUseCase.execute(id);
  }

  getTag(id: string): Promise<SubtaskModel> {
    return this.getUseCase.execute(id);
  }

  getTaskTags(taskId: string): Promise<SubtaskModel[]> {
    return this.getSubtasksUseCase.execute(taskId);
  }
}
