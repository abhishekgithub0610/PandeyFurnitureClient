import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //create all endpoints

    loginUser: builder.mutation({
      query: (formData) => ({
        url: "auth/login",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Auth"],
    }),

    registerUser: builder.mutation({
      query: (formData) => ({
        url: "auth/register",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Auth"],
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: "auth/reset-password", // ✅ matches controller
        method: "POST",
        body: data,
      }),
    }),
    refreshUser: builder.mutation({
      query: () => ({
        url: "auth/refresh",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    // ---------------- CURRENT USER ----------------
    getCurrentUser: builder.query({
      query: () => "/auth/me",
      providesTags: ["Auth"], // allows auto-update when login/logout happens
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutUserMutation,
  useGetCurrentUserQuery, // ✅ hook to get current user
} = authApi;
