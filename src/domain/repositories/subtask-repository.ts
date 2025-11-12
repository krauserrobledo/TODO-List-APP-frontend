import { SubtaskModel } from "../models/subtask/subtask-model";

export abstract class SubtaskRepository {
  abstract createSubtask(taskId: string, subtask: SubtaskModel): Promise<SubtaskModel>;
  abstract updateSubtask(id: string, subtask: SubtaskModel): Promise<SubtaskModel>;
  abstract deleteSubtask(id: string): Promise<void>;
  abstract getSubtask(id: string): Promise<SubtaskModel>;
  abstract getTaskSubtasks(taskId: string): Promise<SubtaskModel[]>;
}