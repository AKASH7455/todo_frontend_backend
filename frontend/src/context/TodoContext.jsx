import { createContext, useContext, useReducer, useEffect } from 'react';
import { getAllTodos, createTodo, updateTodo, patchTodo, deleteTodo } from '../services/todoService';
import { useAuth } from './AuthContext';

const TodoContext = createContext();

const initialState = {
  todos: [],
  isLoading: false,
  error: null,
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'SET_TODOS':
      return { ...state, todos: action.payload, isLoading: false, error: null };
    case 'ADD_TODO':
      return { ...state, todos: [action.payload, ...state.todos], error: null };
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo._id === action.payload.id ? { ...todo, ...action.payload.data } : todo
        ),
        error: null,
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo._id !== action.payload),
        error: null,
      };
    case 'CLEAR_TODOS':
      return { ...initialState };
    default:
      return state;
  }
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchTodos();
    } else {
      dispatch({ type: 'CLEAR_TODOS' });
    }
  }, [isAuthenticated]);

  const fetchTodos = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await getAllTodos();
      dispatch({ type: 'SET_TODOS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const handleCreateTodo = async (todoData) => {
    try {
      const response = await createTodo(todoData);
      dispatch({ type: 'ADD_TODO', payload: response.data });
      return true;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return false;
    }
  };

  const handleUpdateTodo = async (id, todoData) => {
    // Optimistic update
    dispatch({ type: 'UPDATE_TODO', payload: { id, data: todoData } });
    try {
      const response = await updateTodo(id, todoData);
      // Update with server response (if necessary, though optimistic usually suffices)
      dispatch({ type: 'UPDATE_TODO', payload: { id, data: response.data } });
    } catch (error) {
      // Revert if error (simple implementation sets error, robust reverts state)
      dispatch({ type: 'SET_ERROR', payload: error.message });
      fetchTodos(); // Revert to server state
    }
  };

  const handleToggleTodo = async (id, completed) => {
    dispatch({ type: 'UPDATE_TODO', payload: { id, data: { completed } } });
    try {
      const response = await patchTodo(id, { completed });
      dispatch({ type: 'UPDATE_TODO', payload: { id, data: response.data } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      fetchTodos(); // Revert to server state
    }
  };

  const handleDeleteTodo = async (id) => {
    // Optimistic deletion
    const todoToDelete = state.todos.find(t => t._id === id);
    dispatch({ type: 'DELETE_TODO', payload: id });
    try {
      await deleteTodo(id);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      if (todoToDelete) {
        dispatch({ type: 'ADD_TODO', payload: todoToDelete }); // Revert
      }
    }
  };

  const value = {
    ...state,
    fetchTodos,
    handleCreateTodo,
    handleUpdateTodo,
    handleToggleTodo,
    handleDeleteTodo,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};
