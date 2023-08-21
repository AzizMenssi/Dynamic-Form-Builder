import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import formSlice from '../slices/formSlice';
import logger from 'redux-logger';
import submissionSlice from '../slices/submissionSlice';
const store = configureStore({
  reducer: {
    forms: formSlice,
    submissions:submissionSlice
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
