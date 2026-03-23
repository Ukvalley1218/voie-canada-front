import api from './api';

export const inquiryService = {
  submit: (data) => api.post('/inquiries', data),
  getAll: (params) => api.get('/inquiries', { params }),
  getById: (id) => api.get(`/inquiries/${id}`)
};

export const blogService = {
  getAll: (params) => api.get('/blog', { params }),
  getBySlug: (slug) => api.get(`/blog/${slug}`),
  create: (data) => api.post('/blog', data),
  update: (id, data) => api.put(`/blog/${id}`, data),
  delete: (id) => api.delete(`/blog/${id}`)
};

export const serviceService = {
  getAll: (params) => api.get('/services', { params }),
  getBySlug: (slug) => api.get(`/services/${slug}`),
  getByCategory: (category) => api.get('/services', { params: { category } })
};

export const testimonialService = {
  getAll: (params) => api.get('/testimonials', { params }),
  getById: (id) => api.get(`/testimonials/${id}`),
  getFeatured: () => api.get('/testimonials', { params: { featured: true } })
};

export const settingsService = {
  getPublic: () => api.get('/settings/public'),
  getFull: () => api.get('/settings'),
  update: (data) => api.put('/settings', data),
  updateHero: (data) => api.put('/settings/hero', data),
  updateTrustStats: (stats) => api.put('/settings/trust-stats', { stats }),
  updateContact: (data) => api.put('/settings/contact', data),
  updateSocial: (data) => api.put('/settings/social', data),
  updateCTA: (data) => api.put('/settings/cta', data)
};

export const teamService = {
  getAll: () => api.get('/team'),
  getById: (id) => api.get(`/team/${id}`)
};

export const uploadService = {
  uploadImage: (formData) => api.post('/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  uploadMultiple: (formData) => api.post('/upload/multiple', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
};