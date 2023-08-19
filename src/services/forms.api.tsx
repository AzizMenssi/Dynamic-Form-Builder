import axios from 'axios';
const BASE_URL = 'localhost';
const apiService = {
    fetchForm: (formId: number) => {
        return axios.get(`${BASE_URL}/forms/${formId}`);
    },
    createForm: (formData: any) => {
        return axios.post(`${BASE_URL}/forms`, formData);
    },
    updateForm: (formId: number, formData: any) => {
        return axios.put(`${BASE_URL}/forms/${formId}`, formData);
    },
};
export default apiService;