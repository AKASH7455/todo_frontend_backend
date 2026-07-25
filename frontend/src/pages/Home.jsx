import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import TodoForm from '../components/TodoForm/TodoForm';
import TodoList from '../components/TodoList/TodoList';
import {
  getAllTodos,
  createTodo,
  updateTodo,
  patchTodo,
  deleteTodo,
} from '../services/todoService';
import './Home.css';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getAllTodos();
      setTodos(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleCreateTodo = async (todoData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await createTodo(todoData);
      setTodos([response.data, ...todos]);
      showSuccessMessage('Todo created successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTodo = async (id, completed) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await patchTodo(id, { completed });
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, completed: response.data.completed } : todo
        )
      );
      showSuccessMessage(
        completed ? 'Todo marked as completed!' : 'Todo marked as incomplete!'
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTodo = async (id, todoData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await updateTodo(id, todoData);
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, ...response.data } : todo
        )
      );
      showSuccessMessage('Todo updated successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTodo = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
      showSuccessMessage('Todo deleted successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home">
      <Header />
      
      <main className="home-main">
        <div className="container">
          <TodoForm onSubmit={handleCreateTodo} isLoading={isLoading} />
          
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          
          {error && (
            <div className="error-message-banner">
              {error}
              <button 
                className="close-button" 
                onClick={() => setError(null)}
              >
                ×
              </button>
            </div>
          )}
          
          <TodoList
            todos={todos}
            onToggle={handleToggleTodo}
            onEdit={handleEditTodo}
            onDelete={handleDeleteTodo}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
