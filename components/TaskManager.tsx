
import React, { useState } from 'react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskManagerProps {
  initialTasks?: Task[];
  onTaskCountChange?: (count: number) => void;
}

export const TaskManager: React.FC<TaskManagerProps> = ({ initialTasks = [], onTaskCountChange }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [inputValue, setInputValue] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: inputValue.trim(),
      completed: false,
    };

    const updatedTasks = [...tasks, newTodo];
    setTasks(updatedTasks);
    setInputValue('');
    
    if (onTaskCountChange) onTaskCountChange(updatedTasks.length);
  };

  const toggleTask = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Task Manager</h2>
      
      {/* Task Input Form */}
      <form onSubmit={handleAddTask} className="flex gap-2">
        <input
          type="text"
          name='todo-input'
          placeholder="Add a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border px-3 py-1.5 rounded w-full"
        />
        <button type="submit" aria-label='add-todo-button' className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700">
          Add
        </button>
      </form>

      {/* Conditional Empty Message or Task List */}
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-2">No tasks available.</p>
      ) : (
        <ul className="space-y-2" aria-label='todo-list'>
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between border-b pb-2">
              <span className={task.completed ? 'line-through text-gray-400' : 'text-gray-800'}>
                {task.title}
              </span>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="h-4 w-4 text-blue-600"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};