import { baseAPI } from "../baseApi";

const tripApi = baseAPI
  .enhanceEndpoints({ addTagTypes: ["trips"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      postTrip: builder.mutation({
        query: (userInfo) => {
          return {
            url: "/trips/add-trip",
            method: "POST",
            body: userInfo,
          };
        },
        invalidatesTags: ["trips"],
      }),
      getAllTrip: builder.query({
        query: ({ destination, startDate, endDate, type, keywords, page }) => {
          const params = new URLSearchParams();
          if (destination) {
            params.append("destination", destination);
          }
          if (startDate) {
            params.append("startDate", startDate);
          }
          if (endDate) {
            params.append("endDate", endDate);
          }
          if (type) {
            params.append("type", type);
          }
          if (keywords) {
            params.append("keywords", keywords);
          }
          if (page) {
            params.append("page", page);
          }
          return {
            url: "/trips",
            method: "GET",
            params: params,
          };
        },
        providesTags: ["trips"],
      }),
    }),
  });

export const { usePostTripMutation, useGetAllTripQuery } = tripApi;
