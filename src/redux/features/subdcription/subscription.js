import { baseApi } from "../../baseApi/baseApi";

const subscription = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSubscription: builder.query({
            query: () => ({
                url: "/subscription",
                method: "GET",
            }),
            providesTags: ["Subscription"], // ✅ Provides data tag
        }),
        getSingleSubscription: builder.query({
            query: (id) => ({
                url: `/subscription/${id}`,
            }),
            providesTags: ["Subscription"], // ✅ Provides data tag
        }),
        addSubscription: builder.mutation({
            query: (data) => ({
                url: "/subscription",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Subscription"], // ✅ Invalidate to refetch
        }),

        editSubscription: builder.mutation({
            query: ({ formatted, id }) => ({
                url: `/subscription/${id}`,
                method: "PATCH",
                body: formatted
            }),
            invalidatesTags: ["Subscription"], // ✅ Invalidate to refetch
        })
        ,
        deleteSubscription: builder.mutation({
            query: ({ id }) => ({
                url: `/subscription/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Subscription"], // ✅ Invalidate to refetch
        })
    }),
});

export const {
    useGetAllSubscriptionQuery,
    useAddSubscriptionMutation,
    useGetSingleSubscriptionQuery,
    useEditSubscriptionMutation,
    useDeleteSubscriptionMutation


} = subscription;
