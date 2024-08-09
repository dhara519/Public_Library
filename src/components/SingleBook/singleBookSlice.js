import { createSlice } from "@reduxjs/toolkit";
import { bookBuddyApi } from "../../api/bookBuddyApi";

const singleBookApi = bookBuddyApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleBook: builder.query({
      query: (bookId) => ({
        url: `/api/books/${bookId}`,
        method: "GET",
        responseHandler: (response) => response.text(),
      }),
      providesTags: ["Book"],
    }),
  }),
});

const singleBookSlice = createSlice({
  name: "book",
  initialState: {},
  extraReducers: (builder) => {
    builder.addMatcher(singleBookApi.endpoints.getSingleBook.matchFulfilled);
  },
});

const borrowBookApi = bookBuddyApi.injectEndpoints({
  endpoints: (builder) => ({
    borrowBook: builder.mutation({
      query: (bookId) => ({
        url: `/api/books/${bookId}`,
        available: false,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
        responseHandler: (response) => {
          console.log("Response from returnBook:", response);
          alert("Book Successfully Checked Out");
          return response.json();
        },
      }),
      providesTags: ["Reservations"],
    }),
  }),
});

const borrowBookSlice = createSlice({
  name: "borrow",
  initialState: {
    book: {},
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      bookBuddyApi.endpoints.borrowBook.matchFulfilled,
      (state, { payload }) => {
        console.log("This is the payload of borrow", payload);
        return JSON.parse(payload);
      }
    );
  },
});
export const singleBookReducer = singleBookSlice.reducer;
export const { useGetSingleBookQuery } = singleBookApi;

export const borrowBookReducer = borrowBookSlice.reducer;
export const { useBorrowBookMutation } = borrowBookApi;
