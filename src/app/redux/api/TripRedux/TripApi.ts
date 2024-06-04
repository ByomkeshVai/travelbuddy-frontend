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
        query: ({
          destination,
          startDate,
          endDate,
          type,
          description,
          page,
        }) => {
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
          if (description) {
            params.append("description", description);
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
      geSingleTrip: builder.query({
        query: (tripId) => {
          return {
            url: `/trips/${tripId}`,
            method: "GET",
            params: tripId,
          };
        },
        providesTags: ["trips"],
      }),
      getUserAllTrip: builder.query({
        query: (userId) => {
          return {
            url: `/trips/user-trips/${userId}`,
            method: "GET",
            params: userId,
          };
        },
        providesTags: ["trips"],
      }),

      getSingleUserAllTrip: builder.query({
        query: (userId) => {
          return {
            url: `/trips/all-trips/${userId}`,
            method: "GET",
            params: userId,
          };
        },
        providesTags: ["trips"],
      }),

      deleteSingleUserAllTrip: builder.mutation({
        query: (tripId) => ({
          url: `/trips/delete/${tripId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["trips"],
      }),
      updateTrip: builder.mutation({
        query: ({ tripId, payload }) => {
          return {
            url: `/trips/update/${tripId}`,
            method: "PUT",
            body: payload,
          };
        },
        invalidatesTags: ["trips"],
      }),
    }),
  });

export const {
  usePostTripMutation,
  useGetAllTripQuery,
  useGeSingleTripQuery,
  useGetUserAllTripQuery,
  useGetSingleUserAllTripQuery,
  useDeleteSingleUserAllTripMutation,
  useUpdateTripMutation,
} = tripApi;
