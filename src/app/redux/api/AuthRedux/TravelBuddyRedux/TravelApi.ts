import { baseAPI } from "../../baseApi";

const tripApi = baseAPI
  .enhanceEndpoints({ addTagTypes: ["travel"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      createTravel: builder.mutation({
        query: (userInfo) => {
          return {
            url: "/trip/request",
            method: "POST",
            body: userInfo,
          };
        },
        invalidatesTags: ["travel"],
      }),
      //   getAllTrip: builder.query({
      //     query: ({
      //       destination,
      //       startDate,
      //       endDate,
      //       type,
      //       description,
      //       page,
      //     }) => {
      //       const params = new URLSearchParams();
      //       if (destination) {
      //         params.append("destination", destination);
      //       }
      //       if (startDate) {
      //         params.append("startDate", startDate);
      //       }
      //       if (endDate) {
      //         params.append("endDate", endDate);
      //       }
      //       if (type) {
      //         params.append("type", type);
      //       }
      //       if (description) {
      //         params.append("description", description);
      //       }
      //       if (page) {
      //         params.append("page", page);
      //       }

      //       return {
      //         url: "/trips",
      //         method: "GET",
      //         params: params,
      //       };
      //     },
      //     providesTags: ["trips"],
      //   }),
      //   geSingleTrip: builder.query({
      //     query: (tripId) => {
      //       console.log(tripId);
      //       return {
      //         url: `/trips/${tripId}`,
      //         method: "GET",
      //         params: tripId,
      //       };
      //     },
      //     providesTags: ["trips"],
      //   }),
    }),
  });

export const { useCreateTravelMutation } = tripApi;
