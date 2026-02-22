// ✅ CLEAN PRODUCTION VERSION

import { API_BASE_URL } from "./constants";

export async function apiFetch(url, options = {}, token = null) {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    credentials: "include", // ✅ needed for cookies (GuestCartId)
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }), // ✅ attach token only if exists
      ...options.headers,
    },
    ...options,
  });

  return response;
}
