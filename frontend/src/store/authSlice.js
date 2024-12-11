import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // User data (name, email, role, etc.)
  token: null, // Authentication token
  isAuthenticated: false, // Whether the user is logged in
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      // console.log(user);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      console.log("Logout successfully!!");
      console.log(state);
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
