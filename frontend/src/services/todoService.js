import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/todos';

// Get all todos
export const getAllTodos = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch todos');
  }
};

// Get single todo by ID
export const getTodoById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch todo');
  }
};

// Create new todo
export const createTodo = async (todoData) => {
  try {
    const response = await axios.post(API_BASE_URL, todoData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create todo');
  }
};

// Update complete todo
export const updateTodo = async (id, todoData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, todoData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update todo');
  }
};

// Update partial fields (toggle completed, etc.)
export const patchTodo = async (id, todoData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}`, todoData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update todo');
  }
};

// Delete todo
export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete todo');
  }
};
