import React, { useState } from 'react';
import Header from '../components/Header/Header';
import TodoForm from '../components/TodoForm/TodoForm';
import TodoList from '../components/TodoList/TodoList';
import { useTodo } from '../context/TodoContext';
import './Home.css';

const Home = () => {
  const {
    todos,
    isLoading,
    error,
    handleCreateTodo,
    handleUpdateTodo,
    handleToggleTodo,
    handleDeleteTodo,
  } = useTodo();
  
  const [successMessage, setSuccessMessage] = useState(null);

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const onSubmitCreate = async (todoData) => {
    const success = await handleCreateTodo(todoData);
    if (success) showSuccessMessage('Todo created successfully!');
  };

  const onToggle = async (id, completed) => {
    await handleToggleTodo(id, completed);
    showSuccessMessage(completed ? 'Todo marked as completed!' : 'Todo marked as incomplete!');
  };

  const onEdit = async (id, todoData) => {
    await handleUpdateTodo(id, todoData);
    showSuccessMessage('Todo updated successfully!');
  };

  const onDelete = async (id) => {
    await handleDeleteTodo(id);
    showSuccessMessage('Todo deleted successfully!');
  };

  return (
    <div className="home">
      <Header />
      
      <main className="home-main">
        <div className="container">
          <TodoForm onSubmit={onSubmitCreate} isLoading={isLoading} />
          
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          
          {error && (
            <div className="error-message-banner">
              {error}
            </div>
          )}
          
          <TodoList
            todos={todos}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
            isLoading={isLoading && todos.length === 0}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
