import { baseApi } from "../../baseApi/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/admin/users/all",
          method: "GET",
          params,
        };
      },
    }),

    getsingleUser: builder.query({
      query: (id ) => ({
        url: `/users/profile/${id}`, // Use the user ID to get the single user profile
        method: "GET", // HTTP method
          // Optionally add query parameters if needed
      }),
    }),
  }),
});

export const { useGetAllUsersQuery ,useGetsingleUserQuery} = userApi;
