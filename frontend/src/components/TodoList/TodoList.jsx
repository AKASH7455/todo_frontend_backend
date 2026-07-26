import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

const TodoList = ({ 
  todos, 
  onToggle, 
  onEdit, 
  onDelete, 
  isLoading, 
  error 
}) => {
  if (isLoading && (!todos || todos.length === 0)) {
    return (
      <div className="todo-list todo-list-loading">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading todos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="todo-list todo-list-error">
        <div className="error-icon">⚠️</div>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (!todos || todos.length === 0) {
    return (
      <div className="todo-list todo-list-empty">
        <div className="empty-icon">📝</div>
        <h3 className="empty-title">No todos yet</h3>
        <p className="empty-description">
          Start by adding your first todo above!
        </p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

export default TodoList;
