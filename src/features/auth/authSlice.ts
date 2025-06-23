import {apiSlice} from '../api/apiSlice';

export const authSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    signin: builder.mutation({
      query: body => ({
        url: '/users/login',
        method: 'POST',
        body,
      }),
      //   invalidatesTags: [''],
    }),
    register: builder.mutation({
      query: body => ({
        url: '/users/create',
        method: 'POST',
        body,
      }),
      //   invalidatesTags: [''],
    }),
    // request otp
    requestResetPassword: builder.mutation({
      query: body => ({
        url: '/users/request-reset-password',
        method: 'POST',
        body,
      }),
      //   invalidatesTags: [''],
    }),
    varifyOTP: builder.mutation({
      query: body => ({
        url: '/users/verify-otp',
        method: 'POST',
        body,
      }),
      //   invalidatesTags: [''],
    }),
    resetPassword: builder.mutation({
      query: body => ({
        url: '/users/reset-password',
        method: 'POST',
        body,
      }),
      //   invalidatesTags: [''],
    }),
    // signout: builder.mutation({
    //   query: body => ({
    //     url: '/auth/logout',
    //     method: 'POST',
    //     body,
    //   }),
    //   //   invalidatesTags: [''],
    // }),
  }),
});

export const {
  useSigninMutation,
  useRegisterMutation,
  useRequestResetPasswordMutation,
  useVarifyOTPMutation,
  useResetPasswordMutation,
  //   useSendOtpMutation,
  //   useValidateOtpMutation,
  //   useResetPasswordMutation,
  //   useSignoutMutation,
} = authSlice;
