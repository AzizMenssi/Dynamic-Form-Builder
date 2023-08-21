import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import SubmissionsApiService from '../../services/submissions.api.service';
interface SubmissionsState {
    submissions: any[];
}
const initialState: SubmissionsState = {
    submissions: []
};
export const initSubmissionSliceData = createAsyncThunk('submissions/initSubmissionSliceData', async (_, { dispatch }) => {
    try {
        const submissions = await SubmissionsApiService.getSubmissions().then((res: any) => {
            dispatch(initSubmissions(res.data));
        }).catch((e: any) => {
            console.error(e);
        });
        return submissions;
    } catch (error) {
        throw error;
    }
});
const submissionSlice = createSlice({
    name: 'submissions',
    initialState,
    reducers: {
        // Reducer for initializing the submissions
        initSubmissions(state: any, action: PayloadAction<any>) {
            state.submissions = action.payload;
        },
        // Reducer for adding a new submission to the state
        pushSubmission(state, action: PayloadAction<any>) {
            state.submissions.push(action.payload);
        },
        // Reducer for updating an existing submission in the state
        updateSubmission(state, action: PayloadAction<any>) {
            const updatedSubmissionIndex = state?.submissions?.findIndex(submission => submission._id === action.payload._id);
            if (updatedSubmissionIndex !== -1) {
                state.submissions[updatedSubmissionIndex] = action.payload;
            }
        },
        // Reducer for deleting a submission from the state
        popSubmission(state, action: PayloadAction<any>) {
            state.submissions = state.submissions.filter(submission => submission._id !== action.payload._id);
        },
    },
});
export const { initSubmissions, pushSubmission, updateSubmission, popSubmission } = submissionSlice.actions;
export default submissionSlice.reducer;
