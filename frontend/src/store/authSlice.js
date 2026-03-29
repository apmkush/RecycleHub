import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // User data (name, email, role, etc.)
  token: null, // Authentication token
  isAuthenticated: false, // Whether the user is logged in
};

const authSlice = createSlice({
  name: 'auth',  /// name of this slice
  initialState,    //// initial state
  reducers: {
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      // Persist to localStorage
      try {
        localStorage.setItem('authToken', token);
        localStorage.setItem('authUser', JSON.stringify(user));
      } catch (error) {
        console.error('Error saving auth to localStorage:', error);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      // Clear localStorage
      try {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
      } catch (error) {
        console.error('Error clearing auth from localStorage:', error);
      }
      console.log("Logout successfully!!");
      console.log(state);
    },
    /**
     * Restore auth state from localStorage
     * Called on app initialization to maintain login across page refreshes
     */
    restoreAuthFromStorage: (state) => {
      try {
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('authUser');
        
        if (token && user) {
          state.token = token;
          state.user = JSON.parse(user);
          state.isAuthenticated = true;
        }
      } catch (error) {
        console.error('Error restoring auth from localStorage:', error);
        // Clear corrupted data
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
      }
    },
  },
});

export const { loginSuccess, logout, restoreAuthFromStorage } = authSlice.actions;

export default authSlice.reducer;
