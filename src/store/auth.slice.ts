import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types/auth.types';

type AuthStateType = {
  user: User;
};

const initialState: AuthStateType = {
  user: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        user: action.payload
      };
    },
    logoutUser: (state) => {
      return {
        ...state,
        user: null
      };
    }
  }
});

export const { saveUser, logoutUser } = authSlice.actions;
export const authReducer = authSlice.reducer;