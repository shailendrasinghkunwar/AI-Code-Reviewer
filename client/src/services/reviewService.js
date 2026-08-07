import API from './api';

export const reviewService = {
  analyzeCode: async (reviewData) => {
    const response = await API.post('/reviews/analyze', reviewData);
    return response.data;
  },

  getUserReviews: async (params = {}) => {
    const response = await API.get('/reviews', { params });
    return response.data;
  },

  getReviewById: async (id) => {
    const response = await API.get(`/reviews/${id}`);
    return response.data;
  },

  deleteReview: async (id) => {
    const response = await API.delete(`/reviews/${id}`);
    return response.data;
  },

  getUserStats: async () => {
    const response = await API.get('/reviews/stats');
    return response.data;
  },
};
