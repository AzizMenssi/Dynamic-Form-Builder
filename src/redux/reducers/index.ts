import { combineReducers } from '@reduxjs/toolkit';
import createFormReducer from './createFormReducer';
import updateFormReducer from './updateFormReducer';
import deleteFormReducer from './deleteFormReducer';

const rootReducer = combineReducers({
  createForm: createFormReducer,
  updateForm: updateFormReducer,
  deleteForm: deleteFormReducer,
});

export default rootReducer;