import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types/auth.types';

const initialState = {
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
    }
  }
});

export const { saveUser } = authSlice.actions;
export const authReducer = authSlice.reducer;