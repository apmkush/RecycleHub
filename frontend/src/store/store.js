import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer,REGISTER , REHYDRATE, PAUSE, PERSIST, PURGE } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import authReducer from './authSlice.js';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({ 
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [ REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
