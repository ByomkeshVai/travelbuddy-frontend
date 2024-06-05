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
    updateStatus: builder.mutation({
      query: ({ userId, status }) => {
        return {
          url: `/auth/status/${userId}`,
          method: "POST",
          body: status,
        };
      },
    }),
    updateRole: builder.mutation({
      query: ({ userId, role }) => {
        return {
          url: `/auth/role/${userId}`,
          method: "POST",
          body: role,
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
    AllUser: builder.query({
      query: () => {
        return {
          url: `/auth`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSingleUserQuery,
  useAllUserQuery,
  useUpdateStatusMutation,
  useUpdateRoleMutation,
} = authApi;
