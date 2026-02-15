import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../utility/constants";
import { setAccessToken, logout } from "../slice/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: `${API_BASE_URL}/api`,
  credentials: "include", // Essential for HttpOnly cookies
  prepareHeaders: (headers, { getState }) => {
    // Pull the token directly from Redux memory
    const token = getState()?.auth?.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // 🔴 401 Unauthorized - Access Token likely expired
  if (result?.error?.status === 401) {
    // Avoid infinite loops if the refresh call itself is unauthorized
    if (args.url === "auth/refresh") {
      api.dispatch(logout());
      return result;
    }

    // 🔄 Attempt to get a new Access Token using the HttpOnly Refresh Cookie
    const refreshResult = await baseQuery(
      { url: "auth/refresh", method: "POST" },
      api,
      extraOptions,
    );

    // Check your backend response structure (result.accessToken vs data.accessToken)
    const newToken =
      refreshResult?.data?.result?.accessToken ||
      refreshResult?.data?.accessToken;

    if (newToken) {
      // ✅ Update Redux memory with the new short-lived token
      api.dispatch(setAccessToken(newToken));

      // 🔁 Retry the original failed request with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // 🚨 Refresh failed (cookie expired or invalid) -> Clear state
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "Order", "MenuItem", "Profile"], // Add your tags here for auto-invalidation
  endpoints: () => ({}),
});
