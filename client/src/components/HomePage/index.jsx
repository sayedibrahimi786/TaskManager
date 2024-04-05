import { useState, useEffect } from 'react';
import styles from './styles.module.css';
const apiUrl = import.meta.env.VITE_API_URL;

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [userName, setUserName] = useState('Task Manager')

  useEffect(() => {
    fetchTasks();
    fetchUserName();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the authentication token
      if (!token) {
        return response
          .status(401)
          .json({ success: false, msg: "Token missing!" });
      }

      const response = await fetch(`${apiUrl}/tasks`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the request headers
        },
      });
      const data = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchUserName = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Token missing!"); 
      }

      const response = await fetch(`${apiUrl}/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      setUserName(`${data.firstName}`);
    } catch (error) {
      console.error('Error fetching user name:', error);
    }
  };

  const createTask = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Token missing!"); 
      }

      const response = await fetch(`${apiUrl}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the request headers
        },
        body: JSON.stringify({ name: taskInput }),
      });

      await response.json();
      fetchTasks();
      setTaskInput('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const updateTask = async (taskId, updatedName) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Token missing!"); 
      }
      const response = await fetch(`${apiUrl}/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: updatedName }),
      });

      await response.json();
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Token missing!"); 
      }

      const response = await fetch(`${apiUrl}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      await response.json();
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const showUpdateForm = (taskId, currentName) => {
    const updatedName = prompt('Enter updated task name:', currentName);
    if (updatedName) {
      updateTask(taskId, updatedName);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className={styles.body}>
      <h2 id={styles.h2}>{userName + "'s TaskManager"}</h2>
      <form>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter task"
          required
        />
        <button type="button" onClick={createTask}>Add Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <span className="task-name">{task.name}</span>
            <button className="update-button" onClick={() => showUpdateForm(task._id, task.name)}>Update</button>
            <button className="delete-button" onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className={styles.main_container}>
        <nav className={styles.navbar}>
          <button className={styles.white_btn} onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default TaskManager;
