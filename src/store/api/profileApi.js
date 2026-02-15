import { baseApi } from "./baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "profile/me",
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation({
      query: (body) => ({
        url: "profile",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});
export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
