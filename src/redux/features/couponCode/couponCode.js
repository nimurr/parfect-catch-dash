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
    }),
})

export const { useGetCouponCodeQuery } = dashboardApi