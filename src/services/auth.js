// auth.js
import api from './api';

const registerUser = async (userData) => {
    try {
        const response = await api.post('/auth/v1/users/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

const loginUser = async (userData) => {
    try {
        const response = await api.post('/auth/v1/users/login', userData);
        const { token, user } = response.data;
        return { token, user };
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};

export { 
    registerUser,
    loginUser,
};
