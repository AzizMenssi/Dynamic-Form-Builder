interface UpdateFormAction {
    type: 'UPDATE_FORM';
    payload: any
}
type UpdateFormActionTypes = UpdateFormAction;
interface UpdateFormState {
    forms: any[];
}
const initialState: UpdateFormState = {
    forms: [],
};
const updateFormReducer = (state = initialState, action: UpdateFormActionTypes) => {
    switch (action.type) {
        case 'UPDATE_FORM':
            const updatedForms = state.forms.map((form: any) => {
                if (form.id === action.payload.id) {
                    return { ...form, ...action.payload.data };
                }
                return form;
            });
            return {
                ...state,
                forms: updatedForms,
            };
        default:
            return state;
    }
};
export default updateFormReducer;