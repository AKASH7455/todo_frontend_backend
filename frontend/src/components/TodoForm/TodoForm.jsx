import React, { useState } from 'react';
import './TodoForm.css';

const TodoForm = ({ onSubmit, isLoading }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      completed: false,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="form-input"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <div className="form-group">
        <textarea
          className="form-textarea"
          placeholder="Add a description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
          rows={2}
        />
      </div>

      <div className="form-row">
        <div className="form-group form-group-priority">
          <select
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            disabled={isLoading}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>

        <button
          type="submit"
          className="form-button"
          disabled={isLoading || !title.trim()}
        >
          {isLoading ? 'Adding...' : 'Add Todo'}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
