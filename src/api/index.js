import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const servicesAPI = {
  getAll: () => api.get('/services/'),
  getById: (id) => api.get(`/services/${id}/`),
  getFeatured: () => api.get('/services/featured/'),
  getByCategory: (cat) => api.get(`/services/by-category/${cat}/`),
};

export const projectsAPI = {
  getAll: () => api.get('/projects/'),
  getById: (id) => api.get(`/projects/${id}/`),
  getFeatured: () => api.get('/projects/featured/'),
  getByCategory: (cat) => api.get(`/projects/by-category/${cat}/`),
};

export const testimonialsAPI = {
  getAll: () => api.get('/testimonials/'),
  submit: (data) => api.post('/testimonials/', data),
};

export const contactAPI = {
  submit: (data) => api.post('/contact/', data),
};

export const internshipsAPI = {
  getAll: () => api.get('/internships/'),
  getById: (id) => api.get(`/internships/${id}/`),
  apply: (data) => api.post('/internship-applications/', data),
};

export default api;
