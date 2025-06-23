import {apiSlice} from '../api/apiSlice';

export const profileSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProfile: builder.query({
      query: () => ({
        url: '/users/user-profile/',
        method: 'GET',
      }),
      providesTags: ['Profile'],
    }),
    updateProfile: builder.mutation({
      query: body => ({
        url: '/users/user-profile-update/',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Profile'],
    }),
    changePassword: builder.mutation({
      query: body => ({
        url: '/users/change-password/',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useLazyGetProfileQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = profileSlice;
