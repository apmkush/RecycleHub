import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REGISTER , REHYDRATE, PAUSE, PERSIST, PURGE } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import authReducer from './authSlice.js';
import themeReducer from './slices/ThemeSlice.js';
import cartReducer from './slices/cartSlice.js';

// Persist configuration
const authPersistConfig = {
  key: 'auth',
  storage,
};
const themePersistConfig = {
  key : "theme" , 
  storage,
};
const cartPersistConfig = {
  key: 'cart',
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedThemeReducer = persistReducer(themePersistConfig, themeReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

const store = configureStore({ 
  reducer: {
    auth: persistedAuthReducer,
    theme: persistedThemeReducer, // Theme reducer
    cart: persistedCartReducer, // Cart reducer with persistence
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
