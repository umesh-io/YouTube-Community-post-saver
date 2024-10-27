import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: (data: { email: string; password: string; name: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  getCurrentUser: () => api.get('/auth/me'),
};

export const plans = {
  getAll: () => api.get('/plans'),
  getOne: (id: number) => api.get(`/plans/${id}`),
};

export const subscriptions = {
  getCurrentSubscription: () => api.get('/subscriptions/my-subscription'),
  createCheckoutSession: (planId: number) =>
    api.post('/subscriptions/create-checkout-session', { planId }),
};

export default api;