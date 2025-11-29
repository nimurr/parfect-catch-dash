import { baseApi } from "../../baseApi/baseApi";

const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCouponCode: builder.query({
            query: ({ page, limit }) => ({
                url: `/copon/all?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            transformResponse: (response) => response?.data,
        }),
        createCouponCode: builder.mutation({
            query: (data) => ({
                url: "/copon/create",
                method: "POST",
                body: data,
            }),
            transformResponse: (response) => response?.data,
        }),
    }),
})

export const { useGetCouponCodeQuery , useCreateCouponCodeMutation } = dashboardApi