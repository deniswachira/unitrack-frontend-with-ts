import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserRegisterFormValues } from '../../types/Types';
import { UserLoginFormValues } from '../../types/Types';
import { TUser } from '../../types/Types';
import { apiDomain } from '../../proxxy/proxxy';


export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiDomain }),
  tagTypes: ['users', 'user', 'user-grades'],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials: UserLoginFormValues, ) => ({
        url: 'users/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    registerUser: builder.mutation<TUser,Partial<TUser>>({
      query: (userRegisterPayload: UserRegisterFormValues)=> ({
        url: '/users/auth/register',
        method: 'POST',
        body: userRegisterPayload,
      }),
    }),
    getUserById: builder.query({
      query: (user_id: string) => `users/${user_id}`,
      providesTags: ["user",]
    }),
    updateUserDetails: builder.mutation({
      query: ({ _id, ...patch }) => ({
        url: `users/${_id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ["user"]
    }),
    updateUserInterests: builder.mutation({
      query: ({ _id, ...patch }) => ({
        url: `users-interests/${_id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ["user"]
    }),
    getUserGrades: builder.query({
      query: (user_id: string) => `users-grades/${user_id}`,
      providesTags: ["user-grades",]
    }),
    addUserGrade: builder.mutation({
      query: ({ user_id, ...patch }) => ({
        url: `users-grades/${user_id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ["user-grades"]
    }),
    deleteUserGrade: builder.mutation({
      query: ({ user_id, patch }: { user_id: string; patch: any }) => ({
        url: `users-grades/${user_id}`,
        method: 'DELETE',
        body: patch,
      }),
      invalidatesTags: ["user-grades"]
    }),

}),
});



// Export the auto-generated hooks for each endpoint
// export default userApi;

