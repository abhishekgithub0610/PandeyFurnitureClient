import { baseApi } from "./baseApi";
export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //create all endpoints
    getOrders: builder.query({
      query: (userId = "") => ({
        url: "/OrderHeader",
        params: userId ? { userId } : {},
      }),
      providesTags: ["Order"],
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

    getOrderById: builder.query({
      query: (id) => `/OrderHeader/${id}`,
      providesTags: (result, error, { id }) => [{ type: "Order", id }],
      transformResponse: (response) => {
        if (response && response.result) {
          return response.result;
        }
        return response;
      },
    }),

    createOrder: builder.mutation({
      query: (formData) => ({
        url: "/OrderHeader",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Order"],
    }),

    updateOrder: builder.mutation({
      query: ({ orderId, orderData }) => ({
        url: `/OrderHeader/${orderId}`,
        method: "PUT",
        body: orderData,
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: "Order", id: orderId },
      ],
    }),

    updateOrderDetails: builder.mutation({
      query: ({ orderDetailsId, rating }) => ({
        url: `/OrderDetails/${orderDetailsId}`,
        method: "PUT",
        body: {
          orderDetailId: orderDetailsId,
          rating: rating,
        },
      }),
      invalidatesTags: ["Order", "MenuItem"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useUpdateOrderDetailsMutation,
  useGetOrderByIdQuery,
} = ordersApi;
