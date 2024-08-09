import { createSlice } from "@reduxjs/toolkit";
import { bookBuddyApi } from "../../api/bookBuddyApi";

const accountApi = bookBuddyApi.injectEndpoints({
  endpoints: (builder) => ({
    getAccount: builder.query({
      query: () => ({
        url: "/api/users/me",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
        responseHandler: (response) => {
          console.log("Response from getAccount:", response);
          return response.json();
        },
      }),
      providesTags: ["User"],
    }),
  }),
});

const accountSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      accountApi.endpoints.getAccount.matchFulfilled,
      (state, { payload }) => {
        console.log("This is the payload of Account", payload);
        return JSON.parse(payload);
      }
    );
  },
});

const reservationsApi = bookBuddyApi.injectEndpoints({
  endpoints: (builder) => ({
    getReservations: builder.query({
      query: () => ({
        url: "/api/reservations",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
        responseHandler: (response) => {
          console.log("Response from getReservations:", response);
          return response.json();
        },
      }),
      providesTags: ["Reservations"],
    }),
  }),
});

const reservationsSlice = createSlice({
  name: "reservations",
  initialState: {
    reservation: [],
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      reservationsApi.endpoints.getReservations.matchFulfilled,
      (state, { payload }) => {
        console.log("This is the payload of Reservations", payload);
        return JSON.parse(payload);
      }
    );
  },
});

const returnBookApi = bookBuddyApi.injectEndpoints({
  endpoints: (builder) => ({
    returnBook: builder.mutation({
      query: (id) => ({
        url: `/api/reservations/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
        responseHandler: (response) => {
          console.log("Response from returnBook:", response);
          return response.json();
        },
      }),
      providesTags: ["Reservations"],
    }),
  }),
});

const returnBookSlice = createSlice({
  name: "return",
  initialState: {
    book: {},
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      bookBuddyApi.endpoints.returnBook.matchFulfilled,
      (state, { payload }) => {
        console.log("This is the payload of return", payload);
        return JSON.parse(payload);
      }
    );
  },
});

export const accountReducer = accountSlice.reducer;
export const { useGetAccountQuery } = accountApi;

export const reservationsReducer = reservationsSlice.reducer;
export const { useGetReservationsQuery } = reservationsApi;

export const returnBookReducer = returnBookSlice.reducer;
export const { useReturnBookMutation } = returnBookApi;
