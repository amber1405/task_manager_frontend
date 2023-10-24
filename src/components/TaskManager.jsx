import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { FaCheckCircle, FaRedo, FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar';

const socket = io('http://localhost:5000'); // Replace with your server URL

const TaskManager = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Listen for task updates
    socket.on('taskUpdated', (updatedTask) => {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
        return updatedTasks;
      });
    });
  }, []);

  const addTask = () => {
    if (task.trim() !== '') {
      const newTask = { id: Date.now(), text: task, status: 'pending' };
      setTasks([...tasks, newTask]);
      socket.emit('updateTask', newTask);
      setTask('');

      // Show a notification when a task is added
      toast.success('Task added!', { position: 'top-right' });
    }
  };

  const updateTaskStatus = (taskId, newStatus) => {
    const updatedTask = tasks.find((task) => task.id === taskId);
    if (updatedTask) {
      updatedTask.status = newStatus;
      setTasks([...tasks]);
      socket.emit('updateTask', updatedTask);

      // Show a notification when a task status is updated
      toast.info(`Task marked as ${newStatus}!`, { position: 'top-right' });
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    socket.emit('deleteTask', taskId);

    // Show a notification when a task is deleted
    toast.error('Task deleted!', { position: 'top-right' });
  };

  return (
    <div className="flex">
      <Sidebar />
          <div className="flex-1 container mx-auto p-4">
      {/* <h1 className="text-4xl font-extrabold text-blue-600 mb-6">Task Manager</h1> */}
      
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Add a new task"
          className="border p-2 w-3/4 rounded-l"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 ml-2 rounded-r"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>
      <table className="w-full border-collapse border rounded-lg">
        <thead>
          <tr>
            <th className="bg-gray-100 border p-2">ID</th>
            <th className="bg-gray-100 border p-2">Task</th>
            <th className="bg-gray-100 border p-2">Status</th>
            <th className="bg-gray-100 border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="text-center">
              <td className="border p-2">{task.id}</td>
              <td className="border p-2">{task.text}</td>
              <td className="border p-2">{task.status}</td>
              <td className="border p-2">
                <button
                  className="bg-green-500 text-white p-2 rounded ml-2"
                  onClick={() => updateTaskStatus(task.id, 'completed')}
                >
                  <FaCheckCircle />
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded ml-2"
                  onClick={() => updateTaskStatus(task.id, 'pending')}
                >
                  <FaRedo />
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded ml-2"
                  onClick={() => deleteTask(task.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* React-Toastify container for notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
    </div>

  );
};

export default TaskManager;
