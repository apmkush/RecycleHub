import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const themeSlice = createSlice({
  name: "theme",
  initialState: { darkMode: false }, // Default mode: Light
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode; // Toggle between dark & light mode
    },
  },
});

// Persist the theme state
const persistConfig = {
  key: "theme",
  storage,
};

export const { toggleTheme } = themeSlice.actions;
export default persistReducer(persistConfig, themeSlice.reducer);
