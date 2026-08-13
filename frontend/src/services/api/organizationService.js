import apiClient from '../utils/apiClient';

export const organizationService = {
  getAll: async () => {
    return await apiClient.get('/organizations');
  },

  getById: async (id) => {
    return await apiClient.get(`/organizations/${id}`);
  },
};