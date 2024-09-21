import { configureStore } from '@reduxjs/toolkit';
import authentificationReducer from './slices/authentification';

const store = configureStore({
  reducer: {
    auth: authentificationReducer
  },
});

export default store;
