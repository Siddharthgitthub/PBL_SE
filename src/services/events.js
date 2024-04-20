// events.js
import api from './api';

const getEventById = async (id) => {
  try {
    const response = await api.get(`/api/v1/events/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    throw error;
  }
};

const updateEventById = async (id, eventData) => {
  try {
    const response = await api.put(`/api/v1/events/${id}`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error updating event by ID:', error);
    throw error;
  }
};

const deleteEventById = async (id) => {
  try {
    const response = await api.delete(`/api/v1/events/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting event by ID:', error);
    throw error;
  }
};

const getAllEvents = async () => {
  try {
    const response = await api.get('/api/v1/events');
    return response.data;
  } catch (error) {
    console.error('Error fetching all events:', error);
    throw error;
  }
};

const createEvent = async (eventData) => {
  try {
    const response = await api.post('/api/v1/events', eventData);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export { getEventById, updateEventById, deleteEventById, getAllEvents, createEvent };
