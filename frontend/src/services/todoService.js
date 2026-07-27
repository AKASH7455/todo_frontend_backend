import api from './api';

export const getAllTodos = async () => {
  const response = await api.get('/todos');
  return response.data;
};

export const getTodoById = async (id) => {
  const response = await api.get(`/todos/${id}`);
  return response.data;
};

export const createTodo = async (todoData) => {
  const response = await api.post('/todos', todoData);
  return response.data;
};

export const updateTodo = async (id, todoData) => {
  const response = await api.put(`/todos/${id}`, todoData);
  return response.data;
};

export const patchTodo = async (id, todoData) => {
  const response = await api.patch(`/todos/${id}`, todoData);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await api.delete(`/todos/${id}`);
  return response.data;
};
