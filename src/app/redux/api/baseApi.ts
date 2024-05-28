import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { tagTypes } from "../tag-type";

const baseQuery = fetchBaseQuery({
  baseUrl: `http://localhost:8000/api`,

  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState)?.auth?.token;

    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: ["user"],
});
