import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, getTasks, updateTask } from '../features/tasks';

function TodoApp() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [localTasks, setLocalTasks] = useState([]);

  const { user } = useSelector(state => state.user);
  const { tasks } = useSelector(state => state.task);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getTasks());
    } else {
      const storedTasks = JSON.parse(localStorage.getItem('localTasks')) || [];
      setLocalTasks(storedTasks);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem('localTasks', JSON.stringify(localTasks));
    }
  }, [localTasks, user]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (title.trim() === '') return;

    if (user) {
      dispatch(addTask({ title, description }));
    } else {
      const newTask = { id: Date.now(), title, description, completed: false };
      setLocalTasks([newTask, ...localTasks]);
    }
    setTitle('');
    setDescription('');
  };

  const toggleTask = (id, completed) => {
    if (user) {
      dispatch(updateTask({ id, taskData: { completed } }));
      dispatch(getTasks());
    } else {
      setLocalTasks(
        localTasks.map(task =>
          task.id === id ? { ...task, completed } : task
        )
      );
    }
  };

  const handleDeleteTask = (id) => {
    if (user) {
      dispatch(deleteTask(id));
      dispatch(getTasks());
    } else {
      setLocalTasks(localTasks.filter(task => task.id !== id));
    }
  };

  const tasksToDisplay = user ? tasks : localTasks;

  return (
    <div className="p-10 h-full bg-blue-300 flex items-top justify-start m-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-full">
        <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
        <form onSubmit={handleAddTask} className="mb-4">
          <input
            type="text"
            className="border rounded p-2 w-full mb-2"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="border rounded p-2 w-full mb-2"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="bg-blue-800 text-white px-4 py-2 rounded w-full"
          >
            Add Task
          </button>
        </form>
        <ul>
          {tasksToDisplay?.map((task) => (
            <li
              key={task.id} // Use task.id as the key
              className={`flex flex-col justify-between items-start p-2 py-2 border-b ${
                task.completed ? 'line-through text-gray-500' : ''
              }`}
            >
              <span
                className='font-bold cursor-pointer'
                onClick={() => toggleTask(task.id, !task.completed)}
              >
                {task.title}
              </span>
              <span className='cursor-pointer'>{task.description}</span>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded mt-2 self-end"
                onClick={() => handleDeleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;







