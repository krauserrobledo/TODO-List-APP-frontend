export interface TaskCreateRequest 
{
    title: string;
    description?: string;
    dueDate: string | null;
    status: string
}