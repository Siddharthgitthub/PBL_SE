import api from './api';

const getCollegeById = async (id) => {
  try {
    const response = await api.get(`/api/v1/colleges/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching college by ID:', error);
    throw error;
  }
};

const updateCollegeById = async (id, collegeData) => {
  try {
    const response = await api.put(`/api/v1/colleges/${id}`, collegeData);
    return response.data;
  } catch (error) {
    console.error('Error updating college by ID:', error);
    throw error;
  }
};

const deleteCollegeById = async (id) => {
  try {
    const response = await api.delete(`/api/v1/colleges/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting college by ID:', error);
    throw error;
  }
};

const getAllColleges = async () => {
  try {
    const response = await api.get('/api/v1/colleges');
    return response.data;
  } catch (error) {
    console.error('Error fetching all colleges:', error);
    throw error;
  }
};

export const getNoAuthAllColleges = async () => {
  try {
    const response = await api.get('/auth/v1/collages/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching all colleges:', error);
    throw error;
  }
};

const createCollege = async (collegeData) => {
  try {
    const response = await api.post('/api/v1/colleges', collegeData);
    return response.data;
  } catch (error) {
    console.error('Error creating college:', error);
    throw error;
  }
};

export {
  getCollegeById,
  updateCollegeById,
  deleteCollegeById,
  getAllColleges,
  createCollege,
};
