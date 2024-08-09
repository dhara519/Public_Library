import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookBuddyApi = createApi({
  reducerPath: "bookBuddyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com",
    prepareHeaders: (headers) => {
      const sessionToken = window.sessionStorage.getItem("Token");
      if (sessionToken) {
        headers.set("authorization", `Bearer ${sessionToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Book", "User", "Reservations"],
  endpoints: () => ({}),
});
