import apiClient from '../utils/apiClient';

export const subspecialtyService = {
  getByOrganization: async (orgCode) => {
    return await apiClient.get(`/subspecialties/${orgCode}`);
  },
};