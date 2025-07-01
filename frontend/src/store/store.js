import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer,REGISTER , REHYDRATE, PAUSE, PERSIST, PURGE } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import authReducer from './authSlice.js';
import themeReducer from './slices/ThemeSlice.js'; 

// Persist configuration
const authPersistConfig = {
  key: 'auth',
  storage,
};
const themePersistConfig = {
  key : "theme" , 
  storage,
} ; 

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedThemeReducer = persistReducer(themePersistConfig, themeReducer);

const store = configureStore({ 
  reducer: {
    auth: persistedAuthReducer,
    theme: persistedThemeReducer, // Don't forget to add the theme reducer
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
