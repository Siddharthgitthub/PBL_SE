import api from './api';

const getEventParticipantById = async (id) => {
  try {
    const response = await api.get(`/api/v1/event-participants/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event participant by ID:', error);
    throw error;
  }
};

const getAllEventParticipantsByEventId = async (eventId) => {
  try {
    const response = await api.get(`/api/v1/event-participants/event/${eventId}/participants`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event participant by ID:', error);
    throw error;
  }
};

const updateEventParticipantById = async (id, participantData) => {
  try {
    const response = await api.put(`/api/v1/event-participants/${id}`, participantData);
    return response.data;
  } catch (error) {
    console.error('Error updating event participant by ID:', error);
    throw error;
  }
};

const deleteEventParticipantById = async (id) => {
  try {
    const response = await api.delete(`/api/v1/event-participants/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting event participant by ID:', error);
    throw error;
  }
};

const getAllEventParticipants = async () => {
  try {
    const response = await api.get('/api/v1/event-participants');
    return response.data;
  } catch (error) {
    console.error('Error fetching all event participants:', error);
    throw error;
  }
};

const createEventParticipant = async (participantData) => {
  try {
    const response = await api.post('/api/v1/event-participants/create', participantData);
    return response.data;
  } catch (error) {
    console.error('Error creating event participant:', error);
    throw error;
  }
};

const upsertEventParticipant = async (participantData) => {
  try {
    const response = await api.post('/api/v1/event-participants', participantData);
    return response.data;
  } catch (error) {
    console.error('Error creating event participant:', error);
    throw error;
  }
};

export {
  getEventParticipantById,
  getAllEventParticipantsByEventId,
  updateEventParticipantById,
  deleteEventParticipantById,
  getAllEventParticipants,
  createEventParticipant,
  upsertEventParticipant,
};
