import React, { useEffect, useState } from 'react';
import API from './api'; // Axios instance we defined earlier

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [time, setTime] = useState('');

  // Fetch todos on load
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await API.get('/todos');
      setTodos(res.data);
    } catch (err) {
      console.error('Failed to load todos:', err);
    }
  };

  const handleAdd = async () => {
    if (!text || !time) return alert('Please fill in all fields');
    try {
      await API.post('/todos', { text, time });
      fetchTodos(); // Refresh list
      setText('');
      setTime('');
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      fetchTodos(); // Refresh list
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  return (
    <div>
      <h2>📝 To-Do List</h2>

      <input
        type="text"
        placeholder="Task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="datetime-local"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text} — {new Date(todo.time).toLocaleString()}
            <button onClick={() => handleDelete(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
