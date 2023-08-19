interface DeleteFormAction {
    type: 'DELETE_FORM';
    payload: number;
}
type DeleteFormActionTypes = DeleteFormAction;
interface DeleteFormState {
    forms: any[];
}
const initialState: DeleteFormState = {
    forms: [],
};
const deleteFormReducer = (state = initialState, action: DeleteFormActionTypes) => {
    switch (action.type) {
        case 'DELETE_FORM':
            const filteredForms = state.forms.filter(form => form.id !== action.payload);
            return {
                ...state,
                forms: filteredForms,
            };
        default:
            return state;
    }
};
export default deleteFormReducer;
