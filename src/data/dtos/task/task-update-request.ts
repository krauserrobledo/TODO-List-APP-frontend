export interface TaskUpdateRequest 
{
    title: string;
    description?: string;
    dueDate: string | null;
    status: string;
}