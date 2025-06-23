import {configureStore} from '@reduxjs/toolkit';
import {apiSlice} from './api/apiSlice';
import authStateReducer from './auth/authState';
import profileStateReducer from './profile/profileState';
import conversationStateReducer from './conversation/conversationState';

const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authStateReducer,
    profile: profileStateReducer,
    conversation: conversationStateReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// setupListeners(store.dispatch)
export default store;
