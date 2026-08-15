export interface Task {
    id: string;
    title: string;
    assignee: string;
    priority: 'Low' | 'Medium' | 'High';
    dueDate: string;
    status: 'To Do' | 'In Progress' | 'Done';
    createdAt: string;
    updatedAt: string;
}

export type CreateTaskRequest = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateTaskStatusRequest = { status: Task['status'] };
