import { createSlice } from "@reduxjs/toolkit";

const storedAuth = localStorage.getItem('auth') || sessionStorage.getItem('auth');
const initialAuthState = storedAuth
? JSON.parse(storedAuth)
: {
    token: null,
    isLoggedIn: false,
    userData: null,
    status: 'idle',
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.isLoggedIn = true;
            state.userData = action.payload.userData;
            state.status = 'success';

            // Enregistrer dans le localStorage ou sessionStorage selon la valeur de rememberMe
            if (action.payload.rememberMe) {
                localStorage.setItem('auth', JSON.stringify({
                    token: action.payload.token,
                    userData: action.payload.userData,
                    isLoggedIn: state.isLoggedIn = true
                }));
            } else {
                sessionStorage.setItem('auth', JSON.stringify({
                    token: action.payload.token,
                    userData: action.payload.userData,
                }));
            }
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

            localStorage.removeItem('auth');
            sessionStorage.removeItem('auth');
        },
        updateUser: (state, action) => {
            state.userData = action.payload.userData;

            const storedAuth = localStorage.getItem('auth') || sessionStorage.getItem('auth');
            if(storedAuth) {
                const storage = localStorage.getItem('auth') ? localStorage : sessionStorage;
                storage.setItem('auth', JSON.stringify({
                    ...JSON.parse(storedAuth),
                    userData: action.payload.userData
                }));
            }
        }
    }
})

export const { loginSuccess, loginFailed, logout, updateUser } = authSlice.actions;

export default authSlice.reducer;