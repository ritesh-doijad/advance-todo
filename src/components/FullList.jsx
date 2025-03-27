import React, { useState } from 'react';
import { Plus } from 'lucide-react';

import TaskList from './TaskList';
import TaskInput from './TaskInput';

function FullList() {
  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleTaskImportance = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, important: !task.important } : task
    ));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const task = {
      id: Date.now().toString(),
      text: newTask,
      completed: false,
      important: false,
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
  };

  return (
    <div className=" w-full bg-gray-50">
      <div className="w-full mx-auto p-4">
        <header className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">To Do</h1>
          </div>
          <button onClick={() => setShowSidebar(!showSidebar)} className="p-2 hover:bg-gray-100 rounded-lg">
            <Plus className="h-5 w-5 text-gray-600" />
          </button>
        </header>

        <div className="flex gap-6">
          <main className="flex-1">
            <TaskInput newTask={newTask} setNewTask={setNewTask} addTask={addTask} />
            <TaskList tasks={tasks} toggleTaskCompletion={toggleTaskCompletion} toggleTaskImportance={toggleTaskImportance} />
          </main>
        </div>
      </div>
    </div>
  );
}

export default FullList;
