import { baseApi } from "./baseApi";
export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //create all endpoints
    getOrders: builder.query({
      query: (userId = "") => ({
        url: "orders",
        params: userId ? { userId } : {},
      }),
      providesTags: ["Order"],
      transformResponse: (response) => {
        console.log("API RESPONSE:");
        console.log("API RESPONSE:", response);

        //myfix
        if (response && response.result && Array.isArray(response.result)) {
          return response.result;
        }
        if (response && Array.isArray(response)) {
          return response;
        }
        // if (response?.isSuccess && Array.isArray(response?.result)) {
        //   return response.result;
        // }
        //myfix ends

        return [];
      },
    }),

    getOrderById: builder.query({
      query: (id) => `orders/${id}`,
      providesTags: (result, error, { id }) => [{ type: "Order", id }],
      //myfix
      transformResponse: (response) => {
        if (response && response.result) {
          return response.result;
        }
        return response;
      },
      //transformResponse: (response) => response?.result ?? null,
      //myfix ends
    }),

    createOrder: builder.mutation({
      query: (formData) => ({
        url: "orders",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Order"],
    }),

    updateOrder: builder.mutation({
      query: ({ orderId, orderData }) => ({
        url: `orders/${orderId}`,
        method: "PUT",
        body: orderData,
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: "Order", id: orderId },
      ],
    }),

    updateOrderDetails: builder.mutation({
      query: ({ orderDetailsId, rating }) => ({
        url: `OrderDetails/${orderDetailsId}`,
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
