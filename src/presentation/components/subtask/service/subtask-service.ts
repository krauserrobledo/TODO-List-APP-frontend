import { Injectable } from "@angular/core";
import { SubtaskModel } from "../../../../domain/models/subtask/subtask-model";
import { CreateSubtaskUseCase } from "../../../../domain/usecases/subtask/create-subtask-usecase";
import { DeleteSubtaskUseCase } from "../../../../domain/usecases/subtask/delete-subtask-usecase";
import { GetSubtaskUseCase } from "../../../../domain/usecases/subtask/get-subtask-usecase";
import { UpdateSubtaskUseCase } from "../../../../domain/usecases/subtask/update-subtask-usecase";
import { GetTaskSubtasksUseCase } from "../../../../domain/usecases/subtask/get-task-subtask-usecase";
import { Observable } from "rxjs";


@Injectable({ providedIn: 'root' })
export class SubtaskService {
  constructor(
    private createUseCase: CreateSubtaskUseCase,
    private updateUseCase: UpdateSubtaskUseCase,
    private deleteUseCase: DeleteSubtaskUseCase,
    private getUseCase: GetSubtaskUseCase,
    private getSubtasksUseCase: GetTaskSubtasksUseCase
  ) {}

  createSubtask(model: SubtaskModel): Observable<SubtaskModel> {
    return this.createUseCase.execute(model.taskId, model);
  }

  updateSubtask(id: string, model: SubtaskModel): Observable<SubtaskModel> {
    return this.updateUseCase.execute(id, model);
  }

  deleteSubtask(id: string): void {
    this.deleteUseCase.execute(id);
  }

  getSubtask(id: string): Observable<SubtaskModel> {
    return this.getUseCase.execute(id);
  }

  getTaskSubtasks(taskId: string): Observable<SubtaskModel[]> {
    return this.getSubtasksUseCase.execute(taskId);
  }
}
