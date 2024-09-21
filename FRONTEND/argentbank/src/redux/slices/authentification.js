import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        isLoggedIn: false,
        userData: null,
        status: 'idle',
        error: null
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.isLoggedIn = true;
            state.userData = action.payload.userData;
            state.status = 'success';
        },

        loginFailed: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },

        logout: (state) => {
            state.token = null;
            state.isLoggedIn = false;
            state.userData = null;
            state.status = 'idle';
        }
    }
})

export const { loginSuccess, loginFailed, logout } = authSlice.actions;

export default authSlice.reducer;