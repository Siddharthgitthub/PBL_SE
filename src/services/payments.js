// payments.js
import api from './api';

const getPaymentById = async (id) => {
  try {
    const response = await api.get(`/api/v1/payments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching payment by ID:', error);
    throw error;
  }
};

const updatePaymentById = async (id, paymentData) => {
  try {
    const response = await api.put(`/api/v1/payments/${id}`, paymentData);
    return response.data;
  } catch (error) {
    console.error('Error updating payment by ID:', error);
    throw error;
  }
};

const deletePaymentById = async (id) => {
  try {
    const response = await api.delete(`/api/v1/payments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting payment by ID:', error);
    throw error;
  }
};

const getAllPayments = async () => {
  try {
    const response = await api.get('/api/v1/payments');
    return response.data;
  } catch (error) {
    console.error('Error fetching all payments:', error);
    throw error;
  }
};

const createPayment = async (paymentData) => {
  try {
    const response = await api.post('/api/v1/payments', paymentData);
    return response.data;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};

export { getPaymentById, updatePaymentById, deletePaymentById, getAllPayments, createPayment };
