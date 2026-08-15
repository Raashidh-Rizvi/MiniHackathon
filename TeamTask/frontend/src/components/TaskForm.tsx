import { useState } from 'react';
import { createTask } from '../api';
import type { CreateTaskRequest } from '../types';
import { Save, AlertCircle } from 'lucide-react';

export default function TaskForm({ onSuccess }: { onSuccess: () => void }) {
    const [formData, setFormData] = useState<CreateTaskRequest>({
        title: '',
        assignee: '',
        priority: 'Medium',
        dueDate: new Date().toISOString().split('T')[0],
        status: 'To Do'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            await createTask({
                ...formData,
                dueDate: new Date(formData.dueDate).toISOString()
            });
            onSuccess();
        } catch (err: any) {
            setError(err.response?.data?.message || err.response?.data || 'Failed to create task');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-3 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}
            
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Task Title</label>
                <input
                    type="text"
                    id="title"
                    required
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 px-3"
                    placeholder="E.g., Design Login Page"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="assignee" className="block text-sm font-medium text-slate-700 mb-1">Assignee</label>
                    <input
                        type="text"
                        id="assignee"
                        required
                        value={formData.assignee}
                        onChange={e => setFormData({ ...formData, assignee: e.target.value })}
                        className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 px-3"
                        placeholder="E.g., Sarah"
                    />
                </div>

                <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
                    <input
                        type="date"
                        id="dueDate"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.dueDate}
                        onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                        className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 px-3"
                    />
                </div>

                <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                    <select
                        id="priority"
                        value={formData.priority}
                        onChange={e => setFormData({ ...formData, priority: e.target.value as any })}
                        className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 px-3"
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                    <select
                        id="status"
                        value={formData.status}
                        onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                        className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 px-3"
                    >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
                >
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? 'Saving...' : 'Save Task'}
                </button>
            </div>
        </form>
    );
}
