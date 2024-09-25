import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://66cc14004290b1c4f19bd1fc.mockapi.io/",
  }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => "mockapi",
    }),
  }),
});

export const { useGetDataQuery } = apiSlice;
