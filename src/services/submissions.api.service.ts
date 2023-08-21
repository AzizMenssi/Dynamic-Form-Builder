import axios from 'axios';
const BASE_URL = "http://localhost:3000";
const SubmissionApiService = {
    getSubmissions: () => {
        return axios.get(`${BASE_URL}/submission`);
    },
    createSubmission: (submissionData: any) => {
        return axios.post(`${BASE_URL}/submission`, submissionData);
    },
    updateSubmission: (_id: string, submissionData: any) => {
        return axios.put(`${BASE_URL}/submission/${_id}`, submissionData);
    },
    deleteSubmission: (submissionData: any) => {
        return axios.delete(`${BASE_URL}/submission/${submissionData._id}`);
    },
    submitSubmission: (submissionData: any) => {
        return axios.post(`${BASE_URL}/submission`, submissionData);
    },
};
export default SubmissionApiService;