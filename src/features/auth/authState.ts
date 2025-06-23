import {createSlice} from '@reduxjs/toolkit';
const AuthStateSlice = createSlice({
  name: 'authState',
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    setAuthentication(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const {setAuthentication} = AuthStateSlice.actions;
export default AuthStateSlice.reducer;
