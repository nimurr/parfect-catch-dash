import { baseApi } from "../../baseApi/baseApi";

const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllMusic: builder.query({
            query: () => ({
                url: "/music?sortBy=createdAt:desc",
                method: "GET",
            })
        }),
        addMusic: builder.mutation({
            query: (data) => ({
                url: "/music",
                method: "POST",
                body: data
            })
        }),

        deleteMusic: builder.mutation({
            query: (id) => ({
                url: `/music/${id}`, // Assuming you delete by ID
                method: 'DELETE',
            }),
        }),

        updateMusic: builder.mutation({
            query: ({id, data}) => ({
                url: `/music/${id}`,
                method: 'PATCH',
                body: data, // Include the data you want to update in the body of the request
            })
        })


    }),
});

export const {
    useGetAllMusicQuery,
    useAddMusicMutation,
    useDeleteMusicMutation,
    useUpdateMusicMutation
} = dashboardApi;
