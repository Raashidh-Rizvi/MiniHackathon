import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import TasksPage from './pages/TasksPage';
import AddTaskPage from './pages/AddTaskPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TasksPage />} />
          <Route path="add-task" element={<AddTaskPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
