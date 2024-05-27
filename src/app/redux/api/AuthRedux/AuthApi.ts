import { baseAPI } from "../baseApi";

const authApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    Register: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/auth/register",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    login: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    SingleUser: builder.query({
      query: (id) => {
        return {
          url: `/auth/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useSingleUserQuery } =
  authApi;
