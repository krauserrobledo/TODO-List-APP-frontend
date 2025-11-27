import { Observable } from "rxjs";
import { SubtaskModel } from "../models/subtask/subtask-model";

export abstract class SubtaskRepository {
  abstract createSubtask(taskId: string, subtask: SubtaskModel): Observable<SubtaskModel>;
  abstract updateSubtask(id: string, subtask: SubtaskModel): Observable<SubtaskModel>;
  abstract deleteSubtask(id: string): Observable<void>;
  abstract getSubtask(id: string): Observable<SubtaskModel>;
  abstract getTaskSubtasks(taskId: string): Observable<SubtaskModel[]>;
}