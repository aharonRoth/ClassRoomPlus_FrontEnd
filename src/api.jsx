// api.jsx
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/chatbot';

export const fetchQuestion = (page, id) => {
  return axios.get(`${API_BASE_URL}/question/${page}/${id}`);
};

export const submitResponse = (page, questionId, optionId) => {
  return axios.get(`${API_BASE_URL}/response`, {
    params: { page, questionId, optionId }
  });
};
