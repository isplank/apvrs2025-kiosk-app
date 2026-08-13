import apiClient from '../utils/apiClient';

export const menuService = {
  getByOrganization: async (orgCode) => {
    return await apiClient.get(`/organizations/${orgCode}/menus`);
  },
};