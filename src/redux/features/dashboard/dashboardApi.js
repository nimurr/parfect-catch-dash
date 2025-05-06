import { baseApi } from "../../baseApi/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStatus: builder.query({
      query: () => ({
        url: "/admin/dashboard/status",
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.attributes,
    }),
    getIncomeRatio: builder.query({
      query: (year) => ({
        url: `/admin/income-ratio`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.attributes,
    }),
    getEarnings: builder.query({
      query: () => ({
        url: '/admin/earnings',
        method: "GET"
      })
    })


  }),
});

export const { useGetDashboardStatusQuery, useGetIncomeRatioQuery, useGetEarningsQuery } =
  dashboardApi;
