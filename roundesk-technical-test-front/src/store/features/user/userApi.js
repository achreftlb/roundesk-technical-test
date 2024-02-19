import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {logout} from '../auth/authSlice';


const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000/',
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const customBaseQuery = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && (result.error.status === 401 || result.error.status === 403)) {
        api.dispatch(logout());
        localStorage.removeItem('token');
    }
    return result;
};
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        getUserInformation: builder.query({
            query: () => ({
                url: 'user',
                method: 'GET'
            }),
            providesTags: ['User']
        }),
        registerUser: builder.mutation({
            query: (userDetails) => ({
                url: 'auth/register',
                method: 'POST',
                body: userDetails,
            }),
        }),
    }),
});

export const {useLoginUserMutation, useGetUserInformationQuery, useRegisterUserMutation} = userApi;
