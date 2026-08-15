import type { Task } from '../types';
import { Calendar, User, Clock, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface TaskCardProps {
    task: Task;
    onStatusChange: (id: string, status: Task['status']) => void;
    onDelete: (id: string) => void;
}

export default function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
    const priorityColors = {
        Low: 'bg-green-100 text-green-800',
        Medium: 'bg-yellow-100 text-yellow-800',
        High: 'bg-red-100 text-red-800',
    };

    const statusColors = {
        'To Do': 'bg-slate-100 text-slate-800',
        'In Progress': 'bg-blue-100 text-blue-800',
        'Done': 'bg-emerald-100 text-emerald-800',
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-slate-900 line-clamp-1" title={task.title}>
                    {task.title}
                </h3>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                    {task.priority}
                </span>
            </div>

            <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-slate-600">
                    <User className="h-4 w-4 mr-2 text-slate-400" />
                    <span className="truncate">{task.assignee}</span>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                    <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                    <span>{format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                    <Clock className="h-4 w-4 mr-2 text-slate-400" />
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColors[task.status]}`}>
                        {task.status}
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <select
                    value={task.status}
                    onChange={(e) => onStatusChange(task.id, e.target.value as Task['status'])}
                    className="block w-36 text-sm border-slate-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>

                <button
                    onClick={() => onDelete(task.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete task"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
