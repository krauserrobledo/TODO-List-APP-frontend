import { Injectable } from "@angular/core";
import { SubtaskModel } from "../../../../domain/models/subtask/subtask-model";
import { CreateSubtaskUseCase } from "../../../../domain/usecases/subtask/create-subtask-usecase";
import { DeleteSubtaskUseCase } from "../../../../domain/usecases/subtask/delete-subtask-usecase";
import { GetSubtaskUseCase } from "../../../../domain/usecases/subtask/get-subtask-usecase";
import { UpdateSubtaskUseCase } from "../../../../domain/usecases/subtask/update-subtask-usecase";
import { GetTaskSubtasksUseCase } from "../../../../domain/usecases/subtask/get-task-subtask-usecase";
import { Observable } from "rxjs";

/**
 * Service for managing subtasks.
 * Provides methods to create, update, delete, and retrieve subtasks.
 * Integrates various use cases for subtask operations.
 * @see CreateSubtaskUseCase
 * @see UpdateSubtaskUseCase
 * @see DeleteSubtaskUseCase
 * @see GetSubtaskUseCase
 * @see GetTaskSubtasksUseCase
 */
@Injectable({ providedIn: 'root' })
export class SubtaskService {
  constructor(
    private createUseCase: CreateSubtaskUseCase,
    private updateUseCase: UpdateSubtaskUseCase,
    private deleteUseCase: DeleteSubtaskUseCase,
    private getUseCase: GetSubtaskUseCase,
    private getSubtasksUseCase: GetTaskSubtasksUseCase
  ) { }

  // Create a new subtask
  createSubtask(model: SubtaskModel): Observable<SubtaskModel> {
    return this.createUseCase.execute(model.taskId, model);
  }
  
  // Update an existing subtask
  updateSubtask(id: string, model: SubtaskModel): Observable<SubtaskModel> {
    return this.updateUseCase.execute(id, model);
  }

  // Delete a subtask by ID
  deleteSubtask(id: string): Observable<void> {
    return this.deleteUseCase.execute(id);
  }

  // Get a specific subtask by ID
  getSubtask(id: string): Observable<SubtaskModel> {
    return this.getUseCase.execute(id);
  }

  // Get all subtasks for a specific task
  getTaskSubtasks(taskId: string): Observable<SubtaskModel[]> {
    return this.getSubtasksUseCase.execute(taskId);
  }
}
