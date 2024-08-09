import { createSlice } from "@reduxjs/toolkit";
import { bookBuddyApi } from "../../api/bookBuddyApi";

const bookApi = bookBuddyApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => ({
        url: "/api/books",
        method: "GET",
        responseHandler: (response) => response.text(),
      }),
      providesTags: ["Book"],
    }),
  }),
});

const bookSlice = createSlice({
  name: "books",
  initialState: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      bookApi.endpoints.getAllBooks.matchFulfilled,
      (state, { payload }) => {
        return JSON.parse(payload);
      }
    );
  },
});

export default bookSlice.reducer;
export const { useGetAllBooksQuery } = bookApi;
