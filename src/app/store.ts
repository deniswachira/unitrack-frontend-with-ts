import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { userApi } from '../features/api/userApiSlice';
import { coursesApi } from '../features/api/coursesApi';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { universityCoursesApi } from '../features/api/universityCoursesApi';
import {mentorsApi} from '../features/api/mentorsApi';
import {appointmentsApi} from '../features/api/appointmentApi';

// Create a persist config for the auth slice
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token', 'isAuthenticated','role'], // Specify which parts of the state to persist
};

// Create a persisted reducer for the auth slice
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
    [universityCoursesApi.reducerPath]: universityCoursesApi.reducer,
    [mentorsApi.reducerPath]: mentorsApi.reducer,
    [appointmentsApi.reducerPath]: appointmentsApi.reducer,
        auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // To avoid serialization errors with redux-persist
    }).concat(userApi.middleware,coursesApi.middleware, universityCoursesApi.middleware, mentorsApi.middleware,appointmentsApi.middleware), // Include the bookingApi middleware
});

// Export the persisted store
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
