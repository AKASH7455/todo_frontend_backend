import React, { useState } from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onToggle, onEdit, onDelete, isLoading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [editPriority, setEditPriority] = useState(todo.priority || 'medium');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setEditPriority(todo.priority || 'medium');
  };

  const handleSaveEdit = () => {
    if (!editTitle.trim()) {
      return;
    }

    onEdit(todo._id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      priority: editPriority,
    });

    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      onDelete(todo._id);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#e53e3e';
      case 'medium':
        return '#ed8936';
      case 'low':
        return '#48bb78';
      default:
        return '#718096';
    }
  };

  if (isEditing) {
    return (
      <div className="todo-item todo-item-editing">
        <div className="todo-item-content">
          <input
            type="text"
            className="edit-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            disabled={isLoading}
          />
          <textarea
            className="edit-textarea"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            disabled={isLoading}
            rows={2}
          />
          <select
            className="edit-select"
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
            disabled={isLoading}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>
        <div className="todo-item-actions">
          <button
            className="action-button save-button"
            onClick={handleSaveEdit}
            disabled={isLoading || !editTitle.trim()}
          >
            Save
          </button>
          <button
            className="action-button cancel-button"
            onClick={handleCancelEdit}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'todo-item-completed' : ''}`}>
      <div className="todo-item-content">
        <div className="todo-item-header">
          <input
            type="checkbox"
            className="todo-checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo._id, !todo.completed)}
            disabled={isLoading}
          />
          <h3 className="todo-title">{todo.title}</h3>
          <span
            className="priority-badge"
            style={{ backgroundColor: getPriorityColor(todo.priority) }}
          >
            {todo.priority}
          </span>
        </div>
        {todo.description && (
          <p className="todo-description">{todo.description}</p>
        )}
        <div className="todo-meta">
          <span className="todo-date">
            {new Date(todo.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="todo-item-actions">
        <button
          className="action-button edit-button"
          onClick={handleEdit}
          disabled={isLoading}
          aria-label="Edit todo"
        >
          Edit
        </button>
        <button
          className="action-button delete-button"
          onClick={handleDelete}
          disabled={isLoading}
          aria-label="Delete todo"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
