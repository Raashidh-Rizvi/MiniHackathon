import axios from 'axios';
import type { Task, CreateTaskRequest } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getTasks = async (search?: string, status?: string, assignee?: string) => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (status) params.append('status', status);
    if (assignee) params.append('assignee', assignee);
    
    const response = await api.get<Task[]>(`/tasks?${params.toString()}`);
    return response.data;
};

export const getTask = async (id: string) => {
    const response = await api.get<Task>(`/tasks/${id}`);
    return response.data;
};

export const createTask = async (task: CreateTaskRequest) => {
    const response = await api.post<Task>('/tasks', task);
    return response.data;
};

export const updateTask = async (id: string, task: CreateTaskRequest) => {
    const response = await api.put(`/tasks/${id}`, task);
    return response.data;
};

export const updateTaskStatus = async (id: string, status: Task['status']) => {
    const response = await api.put(`/tasks/${id}/status`, { status });
    return response.data;
};

export const deleteTask = async (id: string) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
};
