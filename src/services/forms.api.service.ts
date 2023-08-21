import axios from 'axios';
const BASE_URL = "http://localhost:3000";
const FormsApiService = {
    getForms: () => {
        return axios.get(`${BASE_URL}/form`);
    },
    createForm: (formData: any) => {
        return axios.post(`${BASE_URL}/form`, formData);
    },
    updateForm: (_id: string, formData: any) => {
        return axios.put(`${BASE_URL}/form/${_id}`, formData);
    },
    deleteForm: (formData: any) => {
        return axios.delete(`${BASE_URL}/form/${formData._id}`);
    },
};
export default FormsApiService;