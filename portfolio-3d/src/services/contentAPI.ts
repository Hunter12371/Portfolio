import axios from 'axios';

// Determine the API URL based on environment
const API_URL = import.meta.env.PROD 
  ? '' // Use relative URLs in production (same domain)
  : 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Content API
export const contentAPI = {
  getContent: async () => {
    try {
      const response = await api.get('/api/content');
      return response.data;
    } catch (error) {
      console.error('Error fetching content:', error);
      throw error;
    }
  },

  getSection: async (section: string) => {
    try {
      const response = await api.get(`/api/content/${section}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${section} section:`, error);
      throw error;
    }
  },

  downloadResume: async () => {
    try {
      const response = await api.get('/api/download-resume', {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('Error downloading resume:', error);
      throw error;
    }
  },
};

export default api;
