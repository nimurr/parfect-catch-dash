import { baseApi } from "../../baseApi/baseApi";

const subscription = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubscription: builder.query({
      query: () => ({
        url: "/subscription",
        method: "GET",
      }),
      
    }),
  }),
});

export const { useGetAllSubscriptionQuery } = subscription;
