import axios from 'axios';
import { getAccessToken } from '../auth/tokenStorage';

const api = axios.create({
  baseURL: 'https://arkevion-backend.onrender.com/api',
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  loginStudent: (credentials) => api.post('/auth/student/login/', credentials),
  loginAdmin: (credentials) => api.post('/auth/admin/login/', credentials),
  me: () => api.get('/auth/me/'),
};

export const studentPortalAPI = {
  getPortal: () => api.get('/student/portal/'),
  checkIn: () => api.post('/student/check-in/'),
  checkOut: () => api.post('/student/check-out/'),
  updateTaskStatus: (id, data) => api.post(`/student/tasks/${id}/status/`, data),
  submitLeave: (data) => api.post('/student/leave-requests/', data),
  updateProfile: (data) => api.patch('/student/profile/', data),
};

export const adminPortalAPI = {
  getPortal: () => api.get('/admin/portal/'),
  createStudent: (data) => api.post('/admin/students/', data),
  updateStudent: (id, data) => api.patch(`/admin/students/${id}/`, data),
  deleteStudent: (id) => api.delete(`/admin/students/${id}/`),
  createTask: (data) => api.post('/admin/tasks/', data),
  updateTask: (id, data) => api.patch(`/admin/tasks/${id}/`, data),
  deleteTask: (id) => api.delete(`/admin/tasks/${id}/`),
  reviewLeave: (id, action) => api.post(`/admin/leaves/${id}/${action}/`),
};

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
