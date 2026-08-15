import TaskForm from '../components/TaskForm';
import { useNavigate } from 'react-router-dom';

export default function AddTaskPage() {
    const navigate = useNavigate();

    return (
        <div className="max-w-2xl mx-auto animate-in fade-in duration-500">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Add New Task</h1>
                <p className="text-slate-500 mt-1">Create a new task and assign it to a team member.</p>
            </div>
            
            <TaskForm onSuccess={() => navigate('/')} />
        </div>
    );
}
