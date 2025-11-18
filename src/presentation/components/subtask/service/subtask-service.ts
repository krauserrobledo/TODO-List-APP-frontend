

@Injectable({ providedIn: 'root' })
export class SubtaskService {
  constructor(
    private createUseCase: CreateTaskUseCase,
    private updateUseCase: UpdateTaskUseCase,
    private deleteUseCase: DeleteTaskUseCase,
    private getTaskUseCase: GetTaskUseCase,
    private getUserTasksUseCase: GetUserTasksUseCase,
    private addCategoryUseCase: AddCategoryToTaskUseCase,
    private addTagUseCase: AddTagToTaskUseCase,
    private deleteCategoryUseCase: DeleteCategoryFromTaskUseCase,
    private deleteTagUseCase: DeleteTagFromTaskUseCase
  ) {}

  createTask(model: TaskModel): Promise<TaskModel> {
    return this.createUseCase.execute(model);
  }

  updateTask(id: string, model: TaskModel): Promise<TaskModel> {
    return this.updateUseCase.execute(id, model);
  }

  deleteTask(id: string): void {
    this.deleteUseCase.execute(id);
  }

  getTask(id: string): Promise<TaskModel> {
    return this.getTaskUseCase.execute(id);
  }

  getUserTasks(): Promise<TaskModel[]> {
    return this.getUserTasksUseCase.execute();
  }

  addCategory(taskId: string, categoryId: string): void {
    this.addCategoryUseCase.execute(taskId, categoryId);
  }

  addTag(taskId: string, tagId: string): void {
    this.addTagUseCase.execute(taskId, tagId);
  }

  deleteCategory(taskId: string, categoryId: string): void {
    this.deleteCategoryUseCase.execute(taskId, categoryId);
  }

  deleteTag(taskId: string, tagId: string): void {
    this.deleteTagUseCase.execute(taskId, tagId);
  }
}
