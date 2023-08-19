export const createForm = (newForm: any) => ({
    type: 'CREATE_FORM',
    payload: newForm,
});
export const updateForm = (id: number, data: Partial<any>) => ({
    type: 'UPDATE_FORM',
    payload: { id, data },
});
export const deleteForm = (formId: number) => ({
    type: 'DELETE_FORM',
    payload: formId,
});