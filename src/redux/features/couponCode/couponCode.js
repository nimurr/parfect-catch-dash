import { baseApi } from "../../baseApi/baseApi";

const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCouponCode: builder.query({
            query: () => ({
                url: "/admin/coupon-codes",
                method: "GET",
            }),
            transformResponse: (response) => response?.data,
        }),
    }),
})

export const { useGetCouponCodeQuery } = dashboardApi