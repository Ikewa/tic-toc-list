import React, { useState } from 'react';

export default function TodoApp() {
  const [task, setTask] = useState('');
  const [datetime, setDatetime] = useState('');
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (task && datetime) {
      const newTodo = {
        id: Date.now(),
        text: task,
        time: datetime
      };
      setTodos([newTodo, ...todos]);
      setTask('');
      setDatetime('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="p-4 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <input
        type="text"
        value={task}
        onChange={e => setTask(e.target.value)}
        placeholder="Enter task"
        className="border p-2 mr-2 mb-2 w-full"
      />
      <input
        type="datetime-local"
        value={datetime}
        onChange={e => setDatetime(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <button
        onClick={addTodo}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Task
      </button>
      <ul className="mt-4">
        {todos.map(todo => (
          <li key={todo.id} className="border-b p-2 flex justify-between items-center">
            <div>
              <strong>{todo.text}</strong> <br />
              <small>{new Date(todo.time).toLocaleString()}</small>
            </div>
            <button onClick={() => deleteTodo(todo.id)} className="text-red-500">✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
