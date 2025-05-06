import { baseApi } from "../../baseApi/baseApi";

const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getNitification: builder.query({
            query: () => ({
                url: "/admin/notifications",
                method: "GET",
            })
        }),
        readNotificaiton: builder.mutation({
            query: (data) => ({
                url: "/info/seen-notifications",
                method: "PATCH",
                body: data
            })
        })


    }),
});

export const
    {
        useGetNitificationQuery,
        useReadNotificaitonMutation

    }
        = dashboardApi;
