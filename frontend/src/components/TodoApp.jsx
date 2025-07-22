import React, { useEffect, useState } from 'react';
import API from '../api';
import './TodoApp.css'; 

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [time, setTime] = useState('');

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
      fetchTodos();
      setText('');
      setTime('');
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      fetchTodos();
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  return (
    <div className="todo-app">
      <h2 className="todo-title">📝 To-Do List</h2>

      <div className="todo-form">
        <input
          className="todo-input"
          type="text"
          placeholder="Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          className="todo-datetime"
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button className="todo-add-btn" onClick={handleAdd}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map(todo => (
          <li className="todo-item" key={todo.id}>
            <span className="todo-text">
              {todo.text} — {new Date(todo.time).toLocaleString()}
            </span>
            <button className="todo-delete-btn" onClick={() => handleDelete(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
