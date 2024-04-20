// users.js
import api from './api';

const getUsersById = async (id) => {
  try {
    const response = await api.get(`/api/v1/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};

const updateUserById = async (id, userData) => {
  try {
    const response = await api.put(`/api/v1/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user by ID:', error);
    throw error;
  }
};

const deleteUserById = async (id) => {
  try {
    const response = await api.delete(`/api/v1/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user by ID:', error);
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const response = await api.get('/api/v1/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

const createUser = async (userData) => {
  try {
    const response = await api.post('/api/v1/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export { getUsersById, updateUserById, deleteUserById, getAllUsers, createUser };
