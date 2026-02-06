import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../utility/constants";
import { setAccessToken, logout } from "../slice/authSlice";

// Base query with authentication
const baseQuery = fetchBaseQuery({
  baseUrl: `${API_BASE_URL}/api`,
  //my code
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  //my code ends

  // // prepareHeaders: (headers, { getState }) => {
  // //   const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  // //   if (token) {
  // //     headers.set("Authorization", `Bearer ${token}`);
  // //   }
  // //   return headers;
  // // },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // 🔴 Access token expired
  if (result?.error?.status === 401) {
    // Prevent refresh loop
    if (args.url === "/Auth/refresh") {
      api.dispatch(logout());
      return result;
    }

    // Try refresh
    const refreshResult = await baseQuery(
      { url: "/Auth/refresh", method: "POST" },
      api,
      extraOptions,
    );

    //if (refreshResult?.data?.accessToken) {
    if (refreshResult?.data?.result.accessToken) {
      // Save new access token
      //api.dispatch(setAccessToken(refreshResult.data.accessToken));
      api.dispatch(setAccessToken(refreshResult.data.result.accessToken));

      // Retry original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh failed → logout
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  //baseQuery: baseQueryWithAuth,
  baseQuery: baseQueryWithReauth,

  //myfix
  tagTypes: [],
  //tagTypes: ["Order", "MenuItem"],
  //myfix ends
  endpoints: () => ({}), // Endpoints defined in individual API files
});
