import api from './axios'; 

const ContestService = {
    getAll: async (params = {}) => {
        // api.get utilise automatiquement 'http://localhost:8000/api'
        const response = await api.get('/contests', { params });
        return response.data; 
    },

    getBySlug: async (slug) => {
        const response = await api.get(`/contests/${slug}`);
        return response.data;
    },

    participate: async (id, data) => {
        const response = await api.post(`/contests/${id}/participate`, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    }
};

export default ContestService;