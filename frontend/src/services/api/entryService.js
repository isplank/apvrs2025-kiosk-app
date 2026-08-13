import apiClient from '../utils/apiClient';

export const entryService = {
  getEntries: async (params) => {
    const queryString = new URLSearchParams(params).toString();
    return await apiClient.get(`/entries?${queryString}`);
  },

  getById: async (id) => {
    return await apiClient.get(`/entries/${id}`);
  },

  search: async (query, orgCode = null) => {
    const params = new URLSearchParams({ q: query });
    if (orgCode) params.append('orgCode', orgCode);
    return await apiClient.get(`/search?${params.toString()}`);
  },
};