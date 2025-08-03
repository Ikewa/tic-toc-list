import React, { useState, useEffect } from 'react';
import API from '../api';
import './TodoApp.css';

const TodoApp = () => {
  const [text, setText] = useState('');
  const [time, setTime] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await API.get('/todos');
      setTodos(res.data);
    } catch (err) {
      console.error('Failed to load todos', err);
    }
  };

  const addTodo = async () => {
    if (!text.trim() || !time.trim()) return;

    try {
      const res = await API.post('/todos', { task: text, time });
      if (res.status === 201) {
        fetchTodos();
        setText('');
        setTime('');
      }
    } catch (err) {
      console.error('Failed to add todo', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error('Failed to delete todo', err);
    }
  };

  return (
    <div className="todo-app">
      <h1>📝 My To-Do List</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Enter task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.task}</span>
            <span className="todo-time">
              {new Date(todo.time).toLocaleString()}
            </span>
            <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;

