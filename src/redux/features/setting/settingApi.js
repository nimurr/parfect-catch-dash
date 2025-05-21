import { baseApi } from "../../baseApi/baseApi";

const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTermsCondition: builder.query({
      query: () => ({
        url: "/info/terms-condition",
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.attributes,
    }),

    getPrivacyPolicy: builder.query({
      query: () => ({
        url: "/info/privacy-policy",
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.attributes,
    }),
    getChildSafetyPolicy: builder.query({
      query: () => ({
        url: "/info/child-safety-policy",
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.attributes,
    }),
    getAboutUs: builder.query({
      query: () => ({
        url: "/info/about-us",
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.attributes,
    }),

    createUpdatePrivacy: builder.mutation({
      query: ({ data }) => ({
        url: "/info/privacy-policy",
        method: "POST",
        body: data,
      }),
    }),

    createAndUpdateTrams: builder.mutation({
      query: ({ data }) => ({
        url: "/info/terms-condition",
        method: "POST",
        body: data,
      }),
    }),

    createAndPostAbout: builder.mutation({
      query: ({ data }) => ({
        url: "/info/about-us",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetTermsConditionQuery,
  useGetPrivacyPolicyQuery,
  useGetChildSafetyPolicyQuery,
  useGetAboutUsQuery,
  useCreateUpdatePrivacyMutation,
  useCreateAndUpdateTramsMutation,
  useCreateAndPostAboutMutation,
} = settingApi;
