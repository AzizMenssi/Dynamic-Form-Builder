import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import FormsApiService from '../../services/forms.api.service';
interface FormsState {
    forms: any[];
}
const initialState: FormsState = {
    forms: []
};
export const initFormSliceData = createAsyncThunk('forms/initFormSliceData', async (_, { dispatch }) => {
    try {
        const forms = await FormsApiService.getForms().then((res: any) => {
            dispatch(initForms(res.data));
        }).catch((error: any) => {
            console.error(error);
        });
        return forms;
    } catch (error) {
        throw error;
    }
});
const formSlice = createSlice({
    name: 'forms',
    initialState,
    reducers: {
        // Reducer for initializing the forms
        initForms(state: any, action: PayloadAction<any>) {
            state.forms = action.payload;
        },
        // Reducer for adding a new form to the state
        pushForm(state, action: PayloadAction<any>) {
            state.forms.push(action.payload);
        },
        // Reducer for updating an existing form in the state
        updateForm(state, action: PayloadAction<any>) {
            const updatedFormIndex = state?.forms?.findIndex(form => form._id === action.payload._id);
            if (updatedFormIndex !== -1) {
                state.forms[updatedFormIndex] = action.payload;
            }
        },
        // Reducer for deleting a form from the state
        popForm(state, action: PayloadAction<any>) {
            state.forms = state.forms.filter(form => form._id !== action.payload._id);
        },
    },
});
export const { initForms, pushForm, updateForm, popForm } = formSlice.actions;
export default formSlice.reducer;
