interface CreateFormAction {
    type: 'CREATE_FORM';
    payload: any;
}
type CreateFormActionTypes = CreateFormAction;
interface CreateFormState {
    forms: any[];
}
const initialState: CreateFormState = {
    forms: [],
};
const createFormReducer = (state = initialState, action: CreateFormActionTypes) => {
    switch (action.type) {
        case 'CREATE_FORM':
            return {
                ...state,
                forms: [...state.forms, action.payload],
            };
        default:
            return state;
    }
};
export default createFormReducer;