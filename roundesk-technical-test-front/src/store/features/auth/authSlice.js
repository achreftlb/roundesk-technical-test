import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {userApi} from "../user/userApi";

export const logoutAndInvalidate = createAsyncThunk(
    'auth/logoutAndInvalidate',
    async (_, { dispatch }) => {
        dispatch(logout()); // Dispatch the logout action to update the state
        dispatch(userApi.util.invalidateTags(['User'])); // Invalidate the 'User' tag
    }
);

const initialState = {
    user: null,
    token: localStorage.getItem('token') ?? null,
    isAuthenticated: !!localStorage.getItem('token')
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload;
            console.log(token)
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
            localStorage.setItem('token',token);
        },
        logout: (state) => {
            localStorage.removeItem('token');
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;


        },
    },

});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
