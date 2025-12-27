import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL, STORAGE_KEYS } from "../../utility/constants";

// Base query with authentication
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL + "/api",
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuth = async (args, _api, extraOptions) => {
  const result = await baseQuery(args, _api, extraOptions);
  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  //myfix
  tagTypes: [],
  //tagTypes: ["Order", "MenuItem"],
  //myfix ends
  endpoints: () => ({}), // Endpoints defined in individual API files
});
