import { baseAPI } from "../baseApi";

const tripApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postTrip: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/trips/add-trip",
          method: "POST",
          body: userInfo,
        };
      },
    }),
  }),
});

export const { usePostTripMutation } = tripApi;
