import { baseApi } from "./baseApi";

export const menuItemsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //create all endpoints
    getMenuItems: builder.query({
      query: () => "menu-item",
      providesTags: ["MenuItem"],
      transformResponse: (response) => {
        if (response && response.result && Array.isArray(response.result)) {
          return response.result;
        }
        if (response && Array.isArray(response)) {
          return response;
        }
        return [];
      },
    }),

    getMenuItemById: builder.query({
      query: (id) => `menu-item/${id}`,
      providesTags: (result, error, { id }) => [{ type: "MenuItem", id }],
      transformResponse: (response) => {
        if (response && response.result) {
          return response.result;
        }
        return response;
      },
    }),

    createMenuItem: builder.mutation({
      query: (formData) => ({
        url: "menu-item",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["MenuItem"],
    }),

    deleteMenuItem: builder.mutation({
      query: (id) => ({
        //url: `/MenuItem?id=${id}`,
        url: `menu-item/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MenuItem"],
    }),

    updateMenuItem: builder.mutation({
      query: ({ id, formData }) => ({
        //url: `/MenuItem?id=${id}`,
        url: `menu-item/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "MenuItem", id }],
    }),
    getCurrentUser: builder.query({
      query: () => "/Auth/me",
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useGetMenuItemsQuery,
  useCreateMenuItemMutation,
  useDeleteMenuItemMutation,
  useUpdateMenuItemMutation,
  useGetMenuItemByIdQuery,
} = menuItemsApi;
