import { useState, useEffect } from 'react';
import { getTasks, updateTaskStatus, deleteTask } from '../api';
import type { Task } from '../types';
import TaskCard from '../components/TaskCard';
import { Search, Filter, RefreshCw } from 'lucide-react';

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [assigneeFilter, setAssigneeFilter] = useState('');

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const data = await getTasks(search, statusFilter, assigneeFilter);
            setTasks(data);
        } catch (error) {
            console.error('Failed to fetch tasks', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [search, statusFilter, assigneeFilter]);

    const handleStatusChange = async (id: string, status: Task['status']) => {
        try {
            await updateTaskStatus(id, status);
            fetchTasks();
        } catch (error) {
            console.error('Failed to update status', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;
        try {
            await deleteTask(id);
            fetchTasks();
        } catch (error) {
            console.error('Failed to delete task', error);
        }
    };

    // Calculate Summary
    const totalTasks = tasks.length;
    const todoTasks = tasks.filter(t => t.status === 'To Do').length;
    const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
    const doneTasks = tasks.filter(t => t.status === 'Done').length;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Summary Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <p className="text-sm font-medium text-slate-500 mb-1">Total Tasks</p>
                    <p className="text-3xl font-bold text-slate-900">{totalTasks}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <p className="text-sm font-medium text-slate-500 mb-1">To Do</p>
                    <p className="text-3xl font-bold text-slate-700">{todoTasks}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <p className="text-sm font-medium text-slate-500 mb-1">In Progress</p>
                    <p className="text-3xl font-bold text-blue-600">{inProgressTasks}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <p className="text-sm font-medium text-slate-500 mb-1">Done</p>
                    <p className="text-3xl font-bold text-emerald-600">{doneTasks}</p>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10"
                    />
                </div>
                
                <div className="flex gap-4">
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="pl-9 block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10"
                        >
                            <option value="">All Statuses</option>
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>

                    <input
                        type="text"
                        placeholder="Filter Assignee..."
                        value={assigneeFilter}
                        onChange={(e) => setAssigneeFilter(e.target.value)}
                        className="block w-40 rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10"
                    />
                    
                    <button
                        onClick={fetchTasks}
                        className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent"
                        title="Refresh"
                    >
                        <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Task Grid */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <RefreshCw className="h-8 w-8 text-indigo-500 animate-spin" />
                </div>
            ) : tasks.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300">
                    <p className="text-slate-500 mb-2">No tasks found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onStatusChange={handleStatusChange}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
