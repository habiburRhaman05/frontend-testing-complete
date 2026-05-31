import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addTodo} from "../lib/redux/todoSlice"
interface RootState {
  todo: {
    list: string[];
  };
}

export const TodoApp = () => {
  const [text, setText] = useState('');
  const todos = useSelector((state: RootState) => state.todo.list);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <div>
      <h1>Todo Manager</h1>
      
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a new todo"
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index} data-testid="todo-item">
            {todo}
          </li>
        ))}
      </ul>
    </div>
  );
};