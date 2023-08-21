import { createSelector } from '@reduxjs/toolkit';

const selectForms = (state: any) => state.forms.forms;
const selectSubmissions = (state: any) => state.submissions.submissions;

export const selectFormById = createSelector(
    [selectForms],
    (forms) => (_id: string) => forms.find((form: any) => form._id === _id)
); export const selectSubmissionById = createSelector(
    [selectSubmissions],
    (submissions) => (_id: string) => submissions.find((submission: any) => submission._id === _id)
);