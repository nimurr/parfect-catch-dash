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
        editCouponCode: builder.mutation({
            query: ({ id, data }) => ({
                url: `/copon/update/${id}`,
                method: "PATCH",
                body: data,
            }),
            transformResponse: (response) => response?.data,
        }),
        deleteCouponCode: builder.mutation({
            query: (id) => ({
                url: `/copon/delete/${id}`,
                method: "DELETE",
            }),
            transformResponse: (response) => response?.data,
        }),
    }),
})

export const { useGetCouponCodeQuery, useCreateCouponCodeMutation, useEditCouponCodeMutation , useDeleteCouponCodeMutation } = dashboardApi